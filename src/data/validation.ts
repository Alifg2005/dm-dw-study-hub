import type { Chapter, ContentBlock, DataTable, Mcq, WrittenQuestion } from '../types/chapter'

export const MCQ_COUNT = 20
const MIN_WRITTEN = 12
const MIN_WRITTEN_FORMATS = 4
const MIN_PER_DIFFICULTY = 3
const MIN_SKILL_KINDS = 4
const MAX_DEFINITION_MCQS = 6
const NEAR_DUPLICATE_THRESHOLD = 0.8

const BANNED_OPTION = /\b(all|none) of the (above|these)\b|\bboth [a-d] and [a-d]\b/i
const PLACEHOLDER = /\b(todo|tbd|lorem ipsum|placeholder)\b/i
const BANNED_DASH = /[—–]/

function tokens(text: string): Set<string> {
  return new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? [])
}

function similarity(a: string, b: string): number {
  const setA = tokens(a)
  const setB = tokens(b)
  const shared = [...setA].filter((token) => setB.has(token)).length
  return shared / (setA.size + setB.size - shared || 1)
}

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, out))
  return out
}

function checkTable(table: DataTable, where: string, errors: string[]) {
  table.rows.forEach((row, index) => {
    if (row.length !== table.headers.length) {
      errors.push(`${where}: row ${index + 1} has ${row.length} cells, expected ${table.headers.length}`)
    }
  })
}

function checkBlock(block: ContentBlock, where: string, errors: string[]) {
  if (block.type === 'table') checkTable(block.table, where, errors)
  if (block.type === 'list' && block.items.length === 0) errors.push(`${where}: empty list`)
  if (block.type === 'flow' && block.steps.length < 2) errors.push(`${where}: flow needs at least 2 steps`)
}

function checkMcqs(mcqs: Mcq[], errors: string[]) {
  if (mcqs.length !== MCQ_COUNT) errors.push(`expected exactly ${MCQ_COUNT} MCQs, found ${mcqs.length}`)

  mcqs.forEach((mcq, index) => {
    const where = `MCQ ${mcq.id || index + 1}`
    if (mcq.options.length !== 4) errors.push(`${where}: expected 4 options`)
    if (new Set(mcq.options.map((option) => option.trim().toLowerCase())).size !== mcq.options.length) {
      errors.push(`${where}: options are not distinct`)
    }
    if (!Number.isInteger(mcq.correctIndex) || mcq.correctIndex < 0 || mcq.correctIndex > 3) {
      errors.push(`${where}: correctIndex out of range`)
    }
    if (mcq.options.some((option) => BANNED_OPTION.test(option))) {
      errors.push(`${where}: order-dependent option such as "all of the above"`)
    }
    if (!mcq.explanation.trim()) errors.push(`${where}: missing explanation`)
    mcqs.slice(index + 1).forEach((other) => {
      if (similarity(mcq.question, other.question) >= NEAR_DUPLICATE_THRESHOLD) {
        errors.push(`${where}: nearly identical to ${other.id}`)
      }
    })
  })

  for (const level of ['easy', 'medium', 'hard'] as const) {
    const count = mcqs.filter((mcq) => mcq.difficulty === level).length
    if (count < MIN_PER_DIFFICULTY) errors.push(`only ${count} ${level} MCQs, need ${MIN_PER_DIFFICULTY}`)
  }
  if (new Set(mcqs.map((mcq) => mcq.skill)).size < MIN_SKILL_KINDS) {
    errors.push(`MCQs need at least ${MIN_SKILL_KINDS} skill kinds`)
  }
  if (mcqs.filter((mcq) => mcq.skill === 'definition').length > MAX_DEFINITION_MCQS) {
    errors.push(`more than ${MAX_DEFINITION_MCQS} definition MCQs`)
  }
}

function checkWritten(written: WrittenQuestion[], errors: string[]) {
  if (written.length < MIN_WRITTEN) errors.push(`expected at least ${MIN_WRITTEN} written questions`)
  if (new Set(written.map((question) => question.format)).size < MIN_WRITTEN_FORMATS) {
    errors.push(`written practice needs at least ${MIN_WRITTEN_FORMATS} formats`)
  }

  written.forEach((question) => {
    const where = `written ${question.id}`
    if (!question.shortAnswer.trim()) errors.push(`${where}: missing short answer`)
    if (question.detailedAnswer.length === 0) errors.push(`${where}: missing detailed answer`)
    if (question.answerTable) checkTable(question.answerTable, where, errors)
    if (question.format === 'matching') {
      if (question.pairs.length < 3) errors.push(`${where}: matching needs at least 3 pairs`)
      if (new Set(question.pairs.map((pair) => pair.term)).size !== question.pairs.length) {
        errors.push(`${where}: duplicate matching terms`)
      }
    }
    if (question.format === 'fill-blank') {
      const count = question.sentence.split('___').length - 1
      if (count === 0 || count !== question.blanks.length) {
        errors.push(`${where}: ${count} blanks in sentence but ${question.blanks.length} answer sets`)
      }
      if (question.blanks.some((answers) => answers.length === 0)) errors.push(`${where}: blank without answers`)
    }
  })
}

/** Returns every rule violation for a chapter. An empty array means it is valid. */
export function validateChapter(chapter: Chapter, expectedSlug?: string): string[] {
  const errors: string[] = []
  const { meta } = chapter

  if (expectedSlug && meta.slug !== expectedSlug) errors.push(`slug "${meta.slug}" must equal "${expectedSlug}"`)
  if (!/^chapter-\d{2}$/.test(meta.slug)) errors.push(`slug "${meta.slug}" must look like chapter-01`)
  if (Number(meta.slug.slice(-2)) !== meta.number) errors.push('meta.number does not match the slug')
  if (!meta.title.trim() || !meta.description.trim()) errors.push('missing title or description')
  if (chapter.overview.length === 0) errors.push('missing overview')
  if (chapter.objectives.length === 0) errors.push('missing learning objectives')
  if (chapter.sections.length === 0) errors.push('missing review sections')
  if (chapter.takeaways.length === 0) errors.push('missing key takeaways')

  chapter.sections.forEach((section) => {
    if (section.blocks.length === 0) errors.push(`section ${section.id}: empty`)
    section.blocks.forEach((block) => checkBlock(block, `section ${section.id}`, errors))
  })
  chapter.comparisons.forEach((item) => checkTable(item.table, `comparison ${item.id}`, errors))
  chapter.examples.forEach((item) => {
    if (item.table) checkTable(item.table, `example ${item.id}`, errors)
  })

  const ids = [
    ...chapter.sections.map((item) => item.id),
    ...chapter.comparisons.map((item) => item.id),
    ...chapter.examples.map((item) => item.id),
    ...chapter.mcqs.map((item) => item.id),
    ...chapter.written.map((item) => item.id),
  ]
  const seen = new Set<string>()
  ids.forEach((id) => {
    if (seen.has(id)) errors.push(`duplicate id "${id}"`)
    seen.add(id)
  })

  checkMcqs(chapter.mcqs, errors)
  checkWritten(chapter.written, errors)

  const strings = collectStrings(chapter)
  strings.forEach((text) => {
    if (PLACEHOLDER.test(text)) errors.push(`placeholder text: "${text.slice(0, 60)}"`)
    if (BANNED_DASH.test(text)) errors.push(`em or en dash in text: "${text.slice(0, 60)}"`)
  })

  return errors
}

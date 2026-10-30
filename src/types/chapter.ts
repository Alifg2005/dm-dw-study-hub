/** Text fields marked RichText support **bold term**, `code`, _{sub} and ^{sup}. */
export type RichText = string

export type ExamScope = 'midterm' | 'final'

export interface ChapterMeta {
  number: number
  /** Must equal the file name without extension, for example "chapter-01". */
  slug: string
  title: string
  description: string
  examScope: ExamScope
}

export interface DataTable {
  caption?: string
  headers: string[]
  /** Each row must have exactly headers.length cells. */
  rows: RichText[][]
}

export type CalloutTone =
  /** Important point from the source. */
  | 'key'
  /** Explanation that goes beyond the supplied material. */
  | 'supplement'
  /** A note about an inconsistency or error in the source. */
  | 'source-note'

export type ContentBlock =
  | { type: 'paragraph'; text: RichText }
  | { type: 'list'; title?: string; ordered?: boolean; items: RichText[] }
  | { type: 'formula'; label?: string; expression: RichText; note?: RichText }
  | { type: 'table'; table: DataTable }
  | { type: 'callout'; tone: CalloutTone; title?: string; text: RichText }
  | { type: 'flow'; steps: { label: string; detail?: RichText }[] }

export interface ReviewSection {
  id: string
  title: string
  blocks: ContentBlock[]
}

export interface KeyConcept {
  term: string
  summary: RichText
}

export interface Definition {
  term: string
  definition: RichText
}

export interface Comparison {
  id: string
  title: string
  intro?: RichText
  table: DataTable
}

export interface WorkedExample {
  id: string
  title: string
  scenario: RichText
  steps: RichText[]
  result: RichText
  table?: DataTable
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export type McqSkill =
  | 'definition'
  | 'concept'
  | 'application'
  | 'comparison'
  | 'scenario'
  | 'analysis'
  | 'technical'

export interface Mcq {
  id: string
  topic: string
  difficulty: Difficulty
  skill: McqSkill
  question: RichText
  options: [RichText, RichText, RichText, RichText]
  /** Index into options as authored. The UI shuffles display order only. */
  correctIndex: 0 | 1 | 2 | 3
  explanation: RichText
}

export type WrittenFormat =
  | 'short'
  | 'definition'
  | 'matching'
  | 'compare'
  | 'fill-blank'
  | 'list'
  | 'explain'
  | 'scenario'

interface WrittenBase {
  id: string
  topic: string
  prompt: RichText
  shortAnswer: RichText
  detailedAnswer: RichText[]
  answerTable?: DataTable
}

export interface StaticWrittenQuestion extends WrittenBase {
  format: 'short' | 'definition' | 'compare' | 'list' | 'explain' | 'scenario'
}

export interface MatchingQuestion extends WrittenBase {
  format: 'matching'
  pairs: { term: string; definition: RichText }[]
}

export interface FillBlankQuestion extends WrittenBase {
  format: 'fill-blank'
  /** Uses ___ for each blank. */
  sentence: string
  /** One entry per blank. Each lists the accepted answers, case-insensitive. */
  blanks: string[][]
}

export type WrittenQuestion = StaticWrittenQuestion | MatchingQuestion | FillBlankQuestion

export interface Chapter {
  meta: ChapterMeta
  overview: RichText[]
  objectives: RichText[]
  keyConcepts: KeyConcept[]
  definitions: Definition[]
  sections: ReviewSection[]
  comparisons: Comparison[]
  examples: WorkedExample[]
  takeaways: RichText[]
  examNotes: RichText[]
  mcqs: Mcq[]
  written: WrittenQuestion[]
}

import { execSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { Chapter } from '../src/types/chapter'
import { validateChapter } from '../src/data/validation'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const chaptersDir = join(root, 'src', 'data', 'chapters')
const SOURCE_FILE = /\.(pdf|ppt|pptx|pptm|key)$/i

let failed = false

function report(label: string, errors: string[]) {
  if (errors.length === 0) {
    console.log(`  ok    ${label}`)
    return
  }
  failed = true
  console.error(`  FAIL  ${label}`)
  errors.forEach((error) => console.error(`        - ${error}`))
}

const files = readdirSync(chaptersDir)
  .filter((file) => /^chapter-\d{2}\.ts$/.test(file))
  .sort()

console.log(`Validating ${files.length} chapters`)
if (files.length === 0) report('chapters', ['no chapter files found'])

const numbers = new Set<number>()
for (const file of files) {
  const module = (await import(pathToFileURL(join(chaptersDir, file)).href)) as { default: Chapter }
  const chapter = module.default
  const errors = validateChapter(chapter, file.replace('.ts', ''))
  if (numbers.has(chapter.meta.number)) errors.push(`duplicate chapter number ${chapter.meta.number}`)
  numbers.add(chapter.meta.number)
  report(
    `${file}: ${chapter.mcqs.length} MCQs, ${chapter.written.length} written, ${chapter.sections.length} topics`,
    errors,
  )
}

console.log('Checking source-material protection')

function walk(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  )
}

report(
  'no source files in public/ or src/',
  [...walk(join(root, 'public')), ...walk(join(root, 'src'))]
    .filter((file) => SOURCE_FILE.test(file))
    .map((file) => `found ${file}`),
)

try {
  const tracked = execSync('git ls-files', { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    .split('\n')
    .filter((file) => SOURCE_FILE.test(file) || file.startsWith('private-materials/'))
  report(
    'no source files tracked by Git',
    tracked.map((file) => `tracked: ${file}`),
  )
} catch {
  console.log('  skip  Git is not available here')
}

if (failed) {
  console.error('\nValidation failed.')
  process.exit(1)
}
console.log('\nAll checks passed.')

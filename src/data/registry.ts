import type { Chapter, ExamScope } from '../types/chapter'
import { validateChapter } from './validation'

const modules = import.meta.glob<{ default: Chapter }>('./chapters/chapter-*.ts', { eager: true })

function loadChapters(): Chapter[] {
  const loaded: Chapter[] = []
  for (const [path, module] of Object.entries(modules)) {
    const slug = path.split('/').pop()!.replace('.ts', '')
    const errors = validateChapter(module.default, slug)
    if (errors.length > 0) {
      console.error(`Chapter ${slug} was excluded because it is invalid:`, errors)
      continue
    }
    loaded.push(module.default)
  }
  return loaded.sort((a, b) => a.meta.number - b.meta.number)
}

export const chapters: Chapter[] = loadChapters()

export function getChapter(slug: string | undefined): Chapter | undefined {
  return chapters.find((chapter) => chapter.meta.slug === slug)
}

export function getAdjacentChapters(chapter: Chapter): { previous?: Chapter; next?: Chapter } {
  const index = chapters.indexOf(chapter)
  return { previous: chapters[index - 1], next: chapters[index + 1] }
}

export const examScopeLabels: Record<ExamScope, string> = {
  midterm: 'Midterm',
  final: 'Final',
}

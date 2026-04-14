import raw from './processData.json'
import type { LearningModule } from '../types'

export type ProcessDataRoot = {
  version: string
  siteName: string
  siteSubtitle: string
  modules: LearningModule[]
}

export const processData = raw as ProcessDataRoot

export const modules: LearningModule[] = processData.modules

export function getModuleById(id: string): LearningModule | undefined {
  return modules.find((m) => m.id === id)
}

export function searchModules(query: string): LearningModule[] {
  const q = query.trim().toLowerCase()
  if (!q) return modules
  return modules.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.subtitle.toLowerCase().includes(q) ||
      m.keywords.some((k) => k.toLowerCase().includes(q)),
  )
}

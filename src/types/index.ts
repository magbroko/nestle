export type RolePath = 'beginner' | 'technician' | 'engineer'

export type ModuleCategory = 'production' | 'industrial-services' | 'safety'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  feedbackWrong: string
}

/** Interactive map / timeline stage — content from `processData.json`. */
export interface TimelineStage {
  id: string
  title: string
  shortLabel: string
  whatIsThis: string
  /** Shown on Technician & Engineer paths only. */
  mechanicalSpecs?: string
  /** Simple sub-flow bullets for the expanded panel. */
  diagramSteps: string[]
  /** Shown on Technician & Engineer paths only — “what can go wrong” at this stage. */
  operationalRisks?: string[]
}

export interface LearningModule {
  id: string
  title: string
  subtitle: string
  category: ModuleCategory
  emphasisRoles: RolePath[]
  estimatedMinutes: number
  keywords: string[]
  /** Safety insights surfaced on every module (hazard awareness). */
  safetyInsights: string[]
  quiz: QuizQuestion[]
  /** Ordered factory stages for the interactive timeline. */
  timeline: TimelineStage[]
}

export const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  production: 'Production',
  'industrial-services': 'Industrial Services',
  safety: 'Safety Systems',
}

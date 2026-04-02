export const PRETEXT_SELECTOR_LIST = [
  '.catalog-entry h3',
  '.catalog-entry p',
  '.reading-paths h2',
  '.chapter-head h2',
  '.chapter-head .chapter-summary',
] as const

export const PRETEXT_SELECTOR = PRETEXT_SELECTOR_LIST.join(', ')

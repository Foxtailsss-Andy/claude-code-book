import {
  layoutWithLines,
  prepareWithSegments,
  setLocale,
  type LayoutLine,
  type LayoutLinesResult,
  type PreparedTextWithSegments,
} from '@chenglou/pretext'

type PretextMode = 'poster' | 'chapter' | 'catalog' | 'summary' | 'aside'

type PretextConfig = {
  mode: PretextMode
  balance: boolean
  minWidthRatio: number
  maxLines: number
  align: 'left' | 'center'
  lineGap: number
}

type LayoutChoice = LayoutLinesResult & {
  width: number
}

const body = document.body
const root = document.documentElement

body.classList.add('js-ready')

const progress = document.getElementById('progress')
const pretextCache = new Map<string, PreparedTextWithSegments>()
const PRETEXT_SELECTOR = [
  '.cover-hero h1',
  '.cover-lead',
  '.hero-bridge',
  '.cover-summary h2',
  '.catalog-entry h3',
  '.catalog-entry p',
  '.hero-book h1',
  '.hero-aside h2',
  '.lead',
  '.reading-paths h2',
  '.chapter-head h2',
  '.chapter-head .chapter-summary',
].join(', ')

function updateProgress(): void {
  const scrollTop = root.scrollTop || document.body.scrollTop
  const scrollHeight = root.scrollHeight - root.clientHeight
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
  if (progress instanceof HTMLElement) {
    progress.style.width = `${pct}%`
  }
}

function initScrollTracking(): void {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
}

function initSidebarTracking(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.sidebar-nav a[href^="#"]'))
  const sections = links
    .map((link) => {
      const target = link.getAttribute('href')
      return target ? document.querySelector<HTMLElement>(target) : null
    })
    .filter((value): value is HTMLElement => value !== null)

  if (sections.length === 0 || !('IntersectionObserver' in window)) return

  const linkMap = new Map<string, HTMLAnchorElement>()
  links.forEach((link) => {
    const href = link.getAttribute('href')
    if (!href) return
    linkMap.set(href.slice(1), link)
  })

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const link = linkMap.get(entry.target.id)
        if (!link) return
        links.forEach((candidate) => candidate.classList.remove('active'))
        link.classList.add('active')
      })
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: 0.01 }
  )

  sections.forEach((section) => activeObserver.observe(section))
}

function initReveal(): void {
  const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
  if (revealTargets.length === 0) return

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'))
    return
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  )

  revealTargets.forEach((target) => revealObserver.observe(target))
}

function initSidebarToggle(): void {
  const sidebar = document.getElementById('readerSidebar')
  const sidebarToggle = document.getElementById('sidebarToggle')
  const sidebarClosers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-sidebar-close], .sidebar-nav a')
  )

  if (!(sidebar instanceof HTMLElement) || !(sidebarToggle instanceof HTMLButtonElement)) return

  const setSidebar = (open: boolean) => {
    body.classList.toggle('sidebar-open', open)
    sidebarToggle.setAttribute('aria-expanded', String(open))
  }

  sidebarToggle.addEventListener('click', () => {
    setSidebar(!body.classList.contains('sidebar-open'))
  })

  sidebarClosers.forEach((node) => {
    node.addEventListener('click', () => setSidebar(false))
  })

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setSidebar(false)
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180) setSidebar(false)
  })
}

function getPretextTargets(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(PRETEXT_SELECTOR))
}

function getPretextText(element: HTMLElement): string {
  const cached = element.dataset.pretextSource
  if (cached) return cached
  const text = (element.textContent ?? '').replace(/\s+/g, ' ').trim()
  element.dataset.pretextSource = text
  return text
}

function getCanvasFont(style: CSSStyleDeclaration): string {
  const parts = [style.fontStyle, style.fontWeight, style.fontSize, style.fontFamily]
    .map((part) => part.trim())
    .filter(Boolean)
  return parts.join(' ')
}

function getLineHeight(style: CSSStyleDeclaration): number {
  const numericLineHeight = Number.parseFloat(style.lineHeight)
  if (Number.isFinite(numericLineHeight)) return numericLineHeight
  const fontSize = Number.parseFloat(style.fontSize)
  return Number.isFinite(fontSize) ? fontSize * 1.45 : 24
}

function getPrepared(text: string, font: string): PreparedTextWithSegments {
  const key = `${font}::${text}`
  const cached = pretextCache.get(key)
  if (cached) return cached
  const prepared = prepareWithSegments(text, font)
  pretextCache.set(key, prepared)
  return prepared
}

function getConfig(element: HTMLElement): PretextConfig {
  if (element.matches('.cover-hero h1, .hero-book h1')) {
    return {
      mode: 'poster',
      balance: true,
      minWidthRatio: 0.54,
      maxLines: 5,
      align: 'left',
      lineGap: window.innerWidth < 760 ? 8 : 14,
    }
  }
  if (element.matches('.chapter-head h2')) {
    return {
      mode: 'chapter',
      balance: true,
      minWidthRatio: 0.72,
      maxLines: 3,
      align: 'left',
      lineGap: window.innerWidth < 760 ? 4 : 8,
    }
  }
  if (element.matches('.catalog-entry h3')) {
    return {
      mode: 'catalog',
      balance: true,
      minWidthRatio: 0.72,
      maxLines: 3,
      align: 'left',
      lineGap: window.innerWidth < 760 ? 2 : 4,
    }
  }
  if (element.matches('.hero-aside h2, .cover-summary h2, .reading-paths h2')) {
    return {
      mode: 'aside',
      balance: true,
      minWidthRatio: 0.78,
      maxLines: 4,
      align: 'left',
      lineGap: window.innerWidth < 760 ? 2 : 4,
    }
  }
  if (element.matches('.cover-lead, .lead')) {
    return {
      mode: 'summary',
      balance: true,
      minWidthRatio: 0.82,
      maxLines: 5,
      align: 'left',
      lineGap: 0,
    }
  }
  return {
    mode: 'summary',
    balance: false,
    minWidthRatio: 1,
    maxLines: 6,
    align: 'left',
    lineGap: 0,
  }
}

function getDecorativeOffset(mode: PretextMode, index: number): number {
  const compact = window.innerWidth < 760

  switch (mode) {
    case 'poster':
      return (compact ? [0, 10, 4, 12, 6] : [0, 24, 8, 28, 10])[index] ?? 0
    case 'chapter':
      return (compact ? [0, 8, 3] : [0, 16, 6])[index] ?? 0
    case 'catalog':
      return (compact ? [0, 4, 0] : [0, 10, 2])[index] ?? 0
    case 'aside':
      return (compact ? [0, 5, 0] : [0, 8, 2])[index] ?? 0
    case 'summary':
      return (compact ? [0, 0, 0, 2, 0] : [0, 0, 0, 4, 0])[index] ?? 0
    default:
      return 0
  }
}

function getLineRotation(mode: PretextMode, index: number): number {
  switch (mode) {
    case 'poster':
      return [0, -0.45, 0.2, -0.3, 0.18][index] ?? 0
    case 'chapter':
      return [0, -0.2, 0.1][index] ?? 0
    case 'catalog':
      return [0, -0.14, 0.08][index] ?? 0
    default:
      return 0
  }
}

function getBalanceScore(lines: LayoutLine[], candidateWidth: number, mode: PretextMode): number {
  const widths = lines.map((line) => line.width)
  const maxWidth = Math.max(...widths)
  const minWidth = Math.min(...widths)
  const average = widths.reduce((sum, width) => sum + width, 0) / widths.length
  const variance =
    widths.reduce((sum, width) => sum + Math.abs(width - average), 0) / Math.max(widths.length, 1)
  const raggedness = maxWidth - minWidth
  const lastLineWidth = widths[widths.length - 1] ?? average
  const lastLinePenalty =
    widths.length > 1 && lastLineWidth < average * 0.58 ? (average * 0.58 - lastLineWidth) * 3 : 0
  const shrinkPenalty =
    mode === 'poster' || mode === 'catalog'
      ? 0
      : Math.max(0, average - candidateWidth * 0.75) * 0.25
  return raggedness + variance * 0.9 + lastLinePenalty + shrinkPenalty
}

function chooseLayout(
  prepared: PreparedTextWithSegments,
  maxWidth: number,
  lineHeight: number,
  config: PretextConfig
): LayoutChoice {
  const natural = layoutWithLines(prepared, maxWidth, lineHeight)
  let best: LayoutChoice = { ...natural, width: maxWidth }

  if (!config.balance || natural.lineCount < 2 || natural.lineCount > config.maxLines) {
    return best
  }

  const mobileFloor = window.innerWidth < 760 ? 0.84 : config.minWidthRatio
  const minWidth = Math.max(Math.round(maxWidth * Math.max(config.minWidthRatio, mobileFloor)), 180)
  const step = maxWidth > 900 ? 16 : maxWidth > 560 ? 12 : 8
  let bestScore = getBalanceScore(natural.lines, maxWidth, config.mode)

  for (let width = maxWidth - step; width >= minWidth; width -= step) {
    const candidate = layoutWithLines(prepared, width, lineHeight)
    if (candidate.lineCount !== natural.lineCount || candidate.lineCount > config.maxLines) continue
    const candidateScore = getBalanceScore(candidate.lines, width, config.mode)
    if (candidateScore < bestScore - 0.25) {
      best = { ...candidate, width }
      bestScore = candidateScore
      continue
    }
    if (Math.abs(candidateScore - bestScore) <= 0.25 && width < best.width) {
      best = { ...candidate, width }
    }
  }

  return best
}

function createVisuallyHiddenText(text: string): HTMLSpanElement {
  const sr = document.createElement('span')
  sr.className = 'pretext-sr'
  sr.textContent = text
  return sr
}

function renderPretextBlock(element: HTMLElement): void {
  const text = getPretextText(element)
  if (text.length === 0) return

  const style = getComputedStyle(element)
  const lineHeight = getLineHeight(style)
  const font = getCanvasFont(style)
  const maxWidth = Math.floor(element.getBoundingClientRect().width)
  if (maxWidth <= 0) return

  const lastWidth = Number.parseFloat(element.dataset.pretextLastWidth || '0')
  const lastFont = element.dataset.pretextLastFont
  if (Math.abs(lastWidth - maxWidth) < 1 && lastFont === font && element.dataset.pretextRendered === 'true') {
    return
  }

  const prepared = getPrepared(text, font)
  const config = getConfig(element)
  const renderLineHeight = lineHeight + config.lineGap
  const chosen = chooseLayout(prepared, maxWidth, renderLineHeight, config)
  const lineMetrics = chosen.lines.map((line, index) => {
    const offset = getDecorativeOffset(config.mode, index)
    return {
      line,
      offset,
      rotation: getLineRotation(config.mode, index),
      width: Math.ceil(line.width),
    }
  })
  const lineWidths = lineMetrics.map((metric) => metric.width + metric.offset)
  const wrapperWidth =
    config.balance && lineWidths.length > 0
      ? Math.ceil(Math.min(maxWidth, Math.max(...lineWidths)))
      : maxWidth

  const linesWrap = document.createElement('span')
  linesWrap.className = `pretext-lines pretext-lines--${config.mode}`
  linesWrap.setAttribute('aria-hidden', 'true')
  linesWrap.style.height = `${Math.ceil(chosen.height)}px`
  linesWrap.style.width = `${wrapperWidth}px`

  lineMetrics.forEach((metric, index) => {
    const lineNode = document.createElement('span')
    lineNode.className = `pretext-line pretext-line--${config.mode}`
    lineNode.textContent = metric.line.text
    const x =
      config.align === 'center' ? Math.max(0, (wrapperWidth - metric.width) / 2) : 0
    lineNode.dataset.lineIndex = String(index)
    lineNode.style.transform = `translate(${Math.round(x + metric.offset)}px, ${Math.round(index * renderLineHeight)}px)`
    lineNode.style.width = `${metric.width}px`
    lineNode.style.setProperty('--pretext-rotation', `${metric.rotation}deg`)
    linesWrap.append(lineNode)
  })

  element.replaceChildren(createVisuallyHiddenText(text), linesWrap)
  element.classList.remove(
    'pretext-mode-poster',
    'pretext-mode-chapter',
    'pretext-mode-catalog',
    'pretext-mode-summary',
    'pretext-mode-aside'
  )
  element.classList.add('pretext-ready', `pretext-mode-${config.mode}`)
  element.dataset.pretextRendered = 'true'
  element.dataset.pretextLastWidth = String(maxWidth)
  element.dataset.pretextLastFont = font
}

function renderPretext(): void {
  getPretextTargets().forEach((element) => renderPretextBlock(element))
}

let scheduled = false
function scheduleRender(): void {
  if (scheduled) return
  scheduled = true
  window.requestAnimationFrame(() => {
    scheduled = false
    renderPretext()
    updateProgress()
  })
}

async function initPretext(): Promise<void> {
  setLocale(document.documentElement.lang || navigator.language)

  if ('fonts' in document) {
    await document.fonts.ready
    document.fonts.addEventListener?.('loadingdone', () => {
      pretextCache.clear()
      scheduleRender()
    })
  }

  renderPretext()
  window.addEventListener('resize', scheduleRender)
}

function init(): void {
  initScrollTracking()
  initSidebarTracking()
  initReveal()
  initSidebarToggle()
  void initPretext()
}

init()

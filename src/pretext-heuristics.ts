export type PretextMode = 'poster' | 'chapter' | 'catalog' | 'summary' | 'aside'

const CJK_CHAR_RE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u

export function isCjkHeavyText(text: string): boolean {
  const visibleChars = Array.from(text).filter((char) => /\S/u.test(char))
  if (visibleChars.length === 0) return false

  const cjkChars = visibleChars.filter((char) => CJK_CHAR_RE.test(char)).length

  return cjkChars / visibleChars.length >= 0.35
}

export function shouldUsePretextLayout(mode: PretextMode, text: string): boolean {
  if (mode === 'poster' && isCjkHeavyText(text)) {
    return false
  }

  return true
}

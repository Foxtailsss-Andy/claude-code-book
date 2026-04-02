import assert from 'node:assert/strict'
import test from 'node:test'

import { PRETEXT_SELECTOR_LIST } from '../src/pretext-targets.ts'

test('hero title and hero summary selectors are not enhanced by pretext', () => {
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.cover-hero h1'), false)
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.hero-book h1'), false)
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.cover-lead'), false)
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.lead'), false)
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.hero-bridge'), false)
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.cover-summary h2'), false)
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.hero-aside h2'), false)
})

test('chapter and catalog selectors still use pretext', () => {
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.chapter-head h2'), true)
  assert.equal(PRETEXT_SELECTOR_LIST.includes('.catalog-entry h3'), true)
})

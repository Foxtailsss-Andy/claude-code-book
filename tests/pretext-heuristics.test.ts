import assert from 'node:assert/strict'
import test from 'node:test'

import { shouldUsePretextLayout } from '../src/pretext-heuristics.ts'

test('disables poster pretext layout for CJK-heavy hero titles', () => {
  const title = '《Claude Code：面向产品经理的深度拆解与产品白盒》'

  assert.equal(shouldUsePretextLayout('poster', title), false)
})

test('keeps poster pretext layout for Latin hero titles', () => {
  const title = 'Claude Code Product Deep Dive'

  assert.equal(shouldUsePretextLayout('poster', title), true)
})

test('keeps non-poster layouts enabled for CJK text', () => {
  const title = '这本书的核心问题'

  assert.equal(shouldUsePretextLayout('aside', title), true)
})

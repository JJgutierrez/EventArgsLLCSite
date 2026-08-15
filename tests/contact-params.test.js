import test from 'node:test'
import assert from 'node:assert/strict'
import { applyContactParams, TOPIC_TO_SERVICE } from '../src/contact-params.js'

function fields(service = '', topic = '') {
  return {
    serviceSelect: { value: service },
    topicInput: { value: topic },
  }
}

test('topic rag-architecture-review maps to copilot when service is absent', () => {
  const next = fields()
  const result = applyContactParams('?topic=rag-architecture-review', next)
  assert.equal(next.topicInput.value, 'rag-architecture-review')
  assert.equal(next.serviceSelect.value, 'copilot')
  assert.equal(result.topic, 'rag-architecture-review')
})

test('topic pr-review-automation maps to devops', () => {
  const next = fields()
  applyContactParams('topic=pr-review-automation', next)
  assert.equal(next.serviceSelect.value, TOPIC_TO_SERVICE['pr-review-automation'])
  assert.equal(next.topicInput.value, 'pr-review-automation')
})

test('explicit service query wins over topic mapping', () => {
  const next = fields()
  applyContactParams('?service=governance&topic=rag-architecture-review', next)
  assert.equal(next.serviceSelect.value, 'governance')
  assert.equal(next.topicInput.value, 'rag-architecture-review')
})

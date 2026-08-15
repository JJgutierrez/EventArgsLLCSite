export const TOPIC_TO_SERVICE = {
  'rag-architecture-review': 'copilot',
  'pr-review-automation': 'devops',
  'ai-workflow-devops': 'devops',
}

export function applyContactParams(search, fields) {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`)
  const service = params.get('service')
  const topic = params.get('topic')
  const { serviceSelect, topicInput } = fields

  if (topic && topicInput) {
    topicInput.value = topic
  }

  if (service && serviceSelect) {
    serviceSelect.value = service
    return { service: serviceSelect.value, topic }
  }

  if (topic && TOPIC_TO_SERVICE[topic] && serviceSelect) {
    serviceSelect.value = TOPIC_TO_SERVICE[topic]
  }

  return { service: serviceSelect?.value || '', topic }
}

export function initContactParams(root = document, search = window.location.search) {
  const serviceSelect = root.getElementById('service')
  const topicInput = root.getElementById('topic')
  if (!serviceSelect && !topicInput) return null
  return applyContactParams(search, { serviceSelect, topicInput })
}

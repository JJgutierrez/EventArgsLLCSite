/**
 * Minimal YAML frontmatter parser for Engineering Insights articles.
 * Supports scalars, quoted strings, and string arrays: ["RAG", "Azure"]
 */

function stripQuotes(value) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseScalar(raw) {
  const value = raw.trim()
  if (value === 'true') return true
  if (value === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim()
    if (!inner) return []
    return inner.split(',').map((item) => stripQuotes(item))
  }
  return stripQuotes(value)
}

function parseBlock(yaml) {
  const data = {}
  let currentKey = null
  let currentObject = null

  for (const line of yaml.split('\n')) {
    if (!line.trim()) continue

    const nested = line.match(/^\s{2}([A-Za-z][\w-]*)\s*:\s*(.*)$/)
    if (nested && currentObject) {
      currentObject[nested[1]] = parseScalar(nested[2])
      continue
    }

    const match = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/)
    if (!match) continue

    const [, key, rest] = match
    if (rest === '') {
      currentKey = key
      currentObject = {}
      data[key] = currentObject
      continue
    }

    currentKey = null
    currentObject = null
    data[key] = parseScalar(rest)
    void currentKey
  }

  return data
}

export function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    throw new Error('Missing YAML frontmatter delimiters')
  }

  return {
    data: parseBlock(match[1]),
    content: match[2].replace(/^\r?\n/, ''),
  }
}

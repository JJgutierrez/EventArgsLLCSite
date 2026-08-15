import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter } from './frontmatter.js'

const CONTENT_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../content/engineering-insights')

export function loadInsightArticles(dir = CONTENT_DIR) {
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const { data, content } = parseFrontmatter(readFileSync(join(dir, name), 'utf8'))
      return { ...data, content, file: name }
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export function getFeaturedArticle(articles = loadInsightArticles()) {
  return articles.find((article) => article.featured) || articles[0]
}

export function initArticleToc(root = document) {
  const body = root.querySelector('.insight-body')
  const nav = root.querySelector('[data-insight-toc]')
  if (!body || !nav) return

  const headings = [...body.querySelectorAll('h2[id]')]
  if (!headings.length) return

  nav.innerHTML = `
    <p class="insight-toc-label">On this page</p>
    <ol class="insight-toc-list">
      ${headings
        .map((heading) => `<li><a href="#${heading.id}">${heading.textContent}</a></li>`)
        .join('')}
    </ol>
  `
}

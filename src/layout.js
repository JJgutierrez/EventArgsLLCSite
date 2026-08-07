import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from './cta.js'

export function initLayout() {
  const app = document.getElementById('app')
  if (!app) return

  const header = document.createElement('header')
  header.className = 'site-header'
  header.innerHTML = `
    <div class="container nav-container">
      <a href="/" class="logo">EventArgs<span>LLC</span></a>
      <button class="menu-toggle" aria-label="Toggle Menu" type="button">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <nav id="nav-menu">
        <ul>
          <li><a href="/" data-link="home">Home</a></li>
          <li><a href="/services.html" data-link="services">Services</a></li>
          <li><a href="/case-studies.html" data-link="case-studies">Case Studies</a></li>
          <li><a href="/about.html" data-link="about">About</a></li>
          <li><a href="/qualify" data-link="qualify">Find your AI fit</a></li>
          <li><a href="${PRIMARY_CTA_HREF}" class="btn btn-primary btn-nav" data-link="contact">${PRIMARY_CTA_LABEL}</a></li>
        </ul>
      </nav>
    </div>
  `
  document.body.insertBefore(header, app)

  const footer = document.createElement('footer')
  footer.className = 'site-footer'
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo">EventArgs<span>LLC</span></div>
          <p class="footer-desc">Senior-led AI engineering consultancy building secure, grounded internal knowledge copilots and automated developer workflows.</p>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="/services.html#copilot">Knowledge Copilots</a></li>
            <li><a href="/services.html#governance">AI Governance</a></li>
            <li><a href="/services.html#devops">AI DevOps</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/about.html">About</a></li>
            <li><a href="/case-studies.html">Case Studies</a></li>
            <li><a href="/qualify">Find your AI fit</a></li>
            <li><a href="${PRIMARY_CTA_HREF}">${PRIMARY_CTA_LABEL}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} EventArgs LLC. All rights reserved.</p>
        <p>Grounded Answers. Safer Rollout.</p>
      </div>
    </div>
  `
  document.body.appendChild(footer)

  const currentPath = window.location.pathname
  header.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href')
    if (href === currentPath || (currentPath === '/' && href === '/') || (href !== '/' && currentPath.endsWith(href))) {
      link.classList.add('active')
    }
  })

  const menuToggle = header.querySelector('.menu-toggle')
  const navMenu = header.querySelector('#nav-menu')
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'))
  }

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20)
  })
}

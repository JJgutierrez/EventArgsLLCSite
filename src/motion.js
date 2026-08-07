export function initMotion(root = document) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hero = root.querySelector('[data-motion="hero"]')
  if (hero) {
    if (reduce) hero.classList.add('is-visible')
    else requestAnimationFrame(() => hero.classList.add('is-visible'))
  }

  if (reduce) {
    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  )

  root.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

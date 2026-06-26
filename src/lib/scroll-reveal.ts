/**
 * Scroll-reveal: adds `.is-visible` to elements marked with [data-reveal]
 * when they enter the viewport.
 *
 * Progressive enhancement: the hidden-initial-state CSS is scoped to
 * `.js-reveal [data-reveal]`. This function adds `js-reveal` to <html> at the
 * very start, so users WITHOUT JS never see the hidden (opacity:0) state —
 * everything stays visible by default.
 *
 * Reduced-motion: when `prefers-reduced-motion: reduce` is active, all
 * [data-reveal] elements are made visible immediately — no IntersectionObserver
 * is set up, no transform is applied.
 *
 * CSS companion lives in src/styles/global.css (the .js-reveal [data-reveal] rules).
 */

export function initScrollReveal(): void {
  if (typeof window === 'undefined') return;

  // Mark the document as JS-enabled so the hidden-initial-state CSS applies.
  document.documentElement.classList.add('js-reveal');

  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (targets.length === 0) return;

  // Respect prefers-reduced-motion: skip animation, show everything immediately.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback for old browsers: show everything.
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    },
  );

  targets.forEach((el) => observer.observe(el));
}

# Accessibility (a11y) Requirements

- **Contrast**: Text contrast ratio >= 4.5:1 against the obsidian background (`#050505`).
- **Semantic HTML**: Proper `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, and `<footer>` semantics.
- **Keyboard Navigation**: Focus rings, skip links, and interactive buttons operable via `Tab`, `Space`, and `Enter`.
- **Screen Reader Support**: Meaningful `aria-label` attributes on icon-only buttons, SVG icons, and external links.
- **Reduced Motion**: Respect `@media (prefers-reduced-motion: reduce)` by disabling pulsing effects and transitions.
- **Responsive Viewports**: Functional scaling across 360px, 390px, 768px, 1024px, 1366px, and 1920px without horizontal body clipping.

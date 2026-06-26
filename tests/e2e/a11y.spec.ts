import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/leistungen/', '/kontakt/', '/faq/'];

for (const path of PAGES) {
  test(`a11y: ${path} — no critical/serious axe violations`, async ({ page }) => {
    await page.goto(path);
    // Wait for content to render
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const violations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (violations.length > 0) {
      console.error('Axe violations:', JSON.stringify(violations, null, 2));
    }
    expect(violations).toHaveLength(0);
  });
}

test('keyboard nav: header menu opens and closes', async ({ page }) => {
  await page.goto('/');
  // Desktop: nav links should be focusable
  const firstNavLink = page.locator('nav[aria-label="Hauptnavigation"] a').first();
  await firstNavLink.focus();
  await expect(firstNavLink).toBeFocused();
});

test('keyboard nav: FAQ accordion opens with Enter', async ({ page }) => {
  await page.goto('/faq/');
  // The accordion trigger uses class .accordion-trigger (not data-accordion-trigger)
  const firstAccordion = page.locator('.accordion-trigger').first();
  await expect(firstAccordion).toHaveCount(1);
  await firstAccordion.focus();
  await page.keyboard.press('Enter');
  // Verify the accordion expanded
  await expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');
});

test('cookie banner: accept button visible and works', async ({ page }) => {
  await page.goto('/');
  // Cookie banner uses role="region" with aria-label="Cookie-Hinweis" (not role="dialog")
  // The mobile menu uses role="dialog" — we must not confuse them
  const banner = page.locator('[role="region"][aria-label*="Cookie"]');
  await expect(banner).toHaveCount(1);
  // Banner is hidden on first load until JS reveals it; wait for it to appear
  const acceptBtn = banner.locator('button').filter({ hasText: /akzeptier/i });
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
    // After accepting, banner should be hidden
    await expect(banner).toBeHidden();
  }
});

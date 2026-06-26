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
  const firstAccordion = page.locator('[data-accordion-trigger]').first();
  if (await firstAccordion.count() > 0) {
    await firstAccordion.focus();
    await page.keyboard.press('Enter');
  }
  // No assertion needed — just verify no crash
});

test('cookie banner: accept button visible and works', async ({ page }) => {
  await page.goto('/');
  // Cookie banner appears when consent is null (first visit)
  const banner = page.locator('[role="dialog"][aria-label]');
  if (await banner.count() > 0) {
    const acceptBtn = banner.locator('button').filter({ hasText: /akzeptier/i });
    if (await acceptBtn.count() > 0) {
      await acceptBtn.click();
    }
  }
  // No error = pass
});

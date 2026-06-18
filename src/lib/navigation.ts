/**
 * Full navigation after auth or mutations. Avoids Next.js 16 router init races
 * from calling router.push() + router.refresh() back-to-back.
 */
export function navigateTo(path: string) {
  window.location.assign(path);
}

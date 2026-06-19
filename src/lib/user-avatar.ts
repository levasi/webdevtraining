/**
 * Google profile photo URLs often fail to load without no-referrer.
 * Request a reasonable thumbnail size when the URL supports it.
 */
export function getGoogleAvatarUrl(imageUrl: string | null | undefined): string | undefined {
  if (!imageUrl) {
    return undefined;
  }

  if (imageUrl.includes("googleusercontent.com") && !imageUrl.includes("=s")) {
    return `${imageUrl}=s96-c`;
  }

  return imageUrl;
}

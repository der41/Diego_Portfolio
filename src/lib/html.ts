export function stripLinks(html: string): string {
  return html.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1");
}

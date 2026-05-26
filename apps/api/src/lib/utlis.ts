export function formatString(string: string): string {
  return string.toLowerCase().replace(/\s/g, "-")
}

export function splitTextByMaxSymbol(text: string, maxLength = 3500): string[] {
  const parts: string[] = [];

  for (let i = 0; i < text.length; i += maxLength) {
    parts.push(text.slice(i, i + maxLength));
  }

  return parts;
}

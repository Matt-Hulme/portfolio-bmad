/**
 * Generates a deterministic gradient based on a string input (e.g., project slug).
 * The same input will always produce the same gradient colors.
 *
 * @param seed - The input string to generate the gradient from
 * @returns A CSS linear-gradient string
 */
export function generateGradient(seed: string): string {
  // Simple hash function to convert string to number
  const hash = seed.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  // Generate first hue from hash
  const hue1 = hash % 360;

  // Golden angle (137.5°) for good color separation
  const hue2 = (hash * 137.5) % 360;

  // Return gradient with consistent saturation and lightness
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 50%), hsl(${hue2}, 70%, 30%))`;
}

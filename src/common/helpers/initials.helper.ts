/** "Clara Ríos" -> "CR" (logo monogram when there is no logo in Content Island) */
export const initialsOf = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

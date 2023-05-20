export function throwError(message: string): void {
  alert(`Error: ${message}`);
  throw new Error(message);
}

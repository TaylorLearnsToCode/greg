export const RolledGemChances: Map<number, number> = new Map([
  [1, 10],
  [2, 25],
  [3, 75],
  [4, 90],
  [5, 100],
]);

export const RolledGemValue: Map<number, string> = new Map([
  [1, 'n10'],
  [2, 'n50'],
  [3, 'n100'],
  [4, 'n500'],
  [5, 'n1000'],
  [6, 'n5000'],
  [7, 'n10000'],
  [8, 'n25000'],
  [9, 'n50000'],
  [10, 'n100000'],
  [11, 'n500000'],
]);

export class GemRollResult {
  n10: number = 0;
  n50: number = 0;
  n100: number = 0;
  n500: number = 0;
  n1000: number = 0;
  n5000: number = 0;
  n10000: number = 0;
  n25000: number = 0;
  n50000: number = 0;
  n100000: number = 0;
  n500000: number = 0;
}

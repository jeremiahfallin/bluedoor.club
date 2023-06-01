export function partition<T>(
  arr: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  const trueArray: T[] = [];
  const falseArray: T[] = [];

  arr.forEach((item: T) => {
    if (predicate(item)) {
      trueArray.push(item);
    } else {
      falseArray.push(item);
    }
  });

  return [trueArray, falseArray];
}

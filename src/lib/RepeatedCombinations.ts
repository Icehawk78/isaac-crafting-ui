export const RepeatedCombinations = <T>(n: number, lst: T[]): T[][]  => {
  return n ? (
    lst.length ? RepeatedCombinations(n - 1, lst).map(function (t) {
      return [lst[0]].concat(t);
    }).concat(RepeatedCombinations(n, lst.slice(1))) : []
  ) : [[]];
};

// If needed, we can derive a significantly faster version of
// the simple recursive function above by memoizing it

// f -> f
export const memoized = (fn: Function) => {
  let m = {} as {[key: string]: any};
  return function (x: any) {
    var args = [].slice.call(arguments),
      strKey = args.join('-');

    let v = m[strKey];
    if ('u' === (typeof v)[0])
      m[strKey] = v = fn.apply(null, args);
    return v;
  }
}
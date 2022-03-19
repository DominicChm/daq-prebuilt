export function calculateTicks(maxTicks, minPoint, maxPoint, spacing) {
  let range = niceNum(maxPoint - minPoint, false);
  let tickSpacing = spacing || niceNum(range / (maxTicks - 1), true);
  let niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
  let niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
  return [tickSpacing, niceMin, niceMax];
}
export function niceNum(range, round) {
  let exponent;
  let fraction;
  let niceFraction;
  exponent = Math.floor(Math.log10(range));
  fraction = range / Math.pow(10, exponent);
  if (round) {
    if (fraction < 1.5)
      niceFraction = 1;
    else if (fraction < 3)
      niceFraction = 2;
    else if (fraction < 7)
      niceFraction = 5;
    else
      niceFraction = 10;
  } else {
    if (fraction <= 1)
      niceFraction = 1;
    else if (fraction <= 2)
      niceFraction = 2;
    else if (fraction <= 5)
      niceFraction = 5;
    else
      niceFraction = 10;
  }
  return niceFraction * Math.pow(10, exponent);
}
export function calculateTickArray(maxTicks, minPoint, maxPoint) {
}

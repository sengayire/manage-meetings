export default (amount, total) => {
  const result = (amount / total) * 100;
  return Math.round(result);
};

export const getRawAmountFromPercentage = (total, percentage) =>
  Math.round((total * percentage) / 100);

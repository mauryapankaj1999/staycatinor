export const formatPrice = (num: any) => {
  return Number(num).toLocaleString("en-IN"); // for Indian-style commas (e.g., 2,50,000)
};

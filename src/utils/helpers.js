export const formatPrice = (num) => {
  const newNum = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num / 100);
  return newNum;
};

export const getUniqueValues = (products, property) => {
  let propArray = products.map((product) => product[property]);
  if (property === "colors") {
    propArray = propArray.flat();
  }
  return ["all", ...new Set(propArray)];
};

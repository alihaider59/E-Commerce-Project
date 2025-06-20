const addGlobalDeal = (product, globalDeal) => {
  const now = new Date();

  if (
    product.flashDeal?.isActive &&
    new Date(product.flashDeal.startTime) <= now &&
    new Date(product.flashDeal.endTime) >= now
  ) {
    const discount = (product.price * product.flashDeal.discountPercent) / 100;
    product.discountedPrice = product.price - discount;
    product.dealType = "flash";
    return product;
  }

  if (
    globalDeal &&
    globalDeal.isActive &&
    new Date(globalDeal.startTime) <= now &&
    new Date(globalDeal.endTime) >= now
  ) {
    const applyTo =
      globalDeal.applyTo === "all" ||
      globalDeal.categories?.some(
        (cat) => cat.toString() === product.category?.toString()
      );

    if (applyTo) {
      const discount = (product.price * globalDeal.discountPercent) / 100;
      product.discountedPrice = product.price - discount;
      product.dealType = "global";
    }
    return product;
  }
};

module.exports = addGlobalDeal;

export function removeDuplicateItems(items) {
  if (items) {
    let filteredItems = [];

    for (let i = 0; i < items.length; i++) {
      const currentItem = items[i];

      if (!filteredItems.find((item) => item.id === currentItem.id)) {
        filteredItems.push(currentItem);
      }
    }

    return filteredItems;
  }
}

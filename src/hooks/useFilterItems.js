import { useCallback } from "react";
import { removeDuplicateItems } from "../helpers/removeDuplicateItems";
import { fetchData } from "../api/api";

export function useFilterItems() {
  const fetchFilteredItems = useCallback(async (params) => {
    const ids = await fetchData("filter", params);
    const items = await fetchData("get_items", { ids });
    const filteredItems = removeDuplicateItems(items);
    return filteredItems;
  }, []);

  return fetchFilteredItems;
}

import { useCallback, useEffect, useState, useMemo } from "react";
import { removeDuplicateItems } from "../helpers/removeDuplicateItems";
import { fetchData } from "../api/api";

const ITEMS_PER_PAGE = 50;

export function useItems(page, listType) {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [numPages, setNumPages] = useState(1);

  // action: filter возвращает, все совпадения, поэтому делим вручную на страницы
  const list = useMemo(() => {
    return listType === "all" ? items : items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  }, [items, page]);

  const fetchItems = useCallback(async (page) => {
    setIsFetching(true);
    const ids = await fetchData("get_ids", { offset: (page - 1) * ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE });
    const items = await fetchData("get_items", { ids });
    setIsFetching(false);
    const filteredItems = removeDuplicateItems(items);
    setItems(filteredItems);
  }, []);
  // Получаем количество страниц
  const getNumPages = useCallback(async () => {
    let pages;

    if (listType === "all") {
      const allItems = await fetchData("get_ids");
      pages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
    } else {
      pages = Math.ceil(items.length / ITEMS_PER_PAGE);
    }

    setNumPages(pages);
  }, [listType, items]);

  useEffect(() => {
    // Делаем fetchItems только, если фильтра нету, с фильтром все итемы уже есть в items
    if (listType === "all") {
      fetchItems(page);
    }
  }, [page, fetchItems, listType]);

  useEffect(() => {
    getNumPages();
  }, [listType, items]);

  return [list, setItems, isFetching, setIsFetching, fetchItems, numPages];
}

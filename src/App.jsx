import { FilterSidebar } from "./components/FilterSidebar/FilterSidebar";
import { ItemList } from "./components/ItemList/ItemList";
import { useState } from "react";
import { useItems } from "./hooks/useItems";

function App() {
  const [page, setPage] = useState(1);
  // all - когда фильтр не установлен
  // filter - когда была нажата кнопка "Отфильтровать" в FilterSidebar
  const [listType, setListType] = useState("all");
  const [list, setItems, isFetching, setIsFetching, fetchItems, numPages] = useItems(page, listType);

  return (
    <div className="App">
      <FilterSidebar
        setListType={setListType}
        setPage={setPage}
        setItems={setItems}
        setIsFetching={setIsFetching}
        fetchItems={fetchItems}
        isFetching={isFetching}
      />
      {list && (
        <ItemList isFetching={isFetching} numPages={numPages} listType={listType} items={list} page={page} setPage={setPage} />
      )}
    </div>
  );
}

export default App;

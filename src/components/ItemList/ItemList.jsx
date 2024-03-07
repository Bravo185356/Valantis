import { Item } from "../Item/Item";
import classes from "./ItemList.module.scss";
import { Pagination } from "../Pagination/Pagination";
import classNames from "classnames";

export const ItemList = ({ items, page, setPage, listType, numPages, isFetching }) => {
  const wrapperClasses = classNames([classes.wrapper, numPages === 1 && classes.noPagination]);
  return (
    <div className={wrapperClasses}>
      {numPages > 1 && (
        <Pagination isFetching={isFetching} numPages={numPages} listType={listType} page={page} setPage={setPage} />
      )}
      {isFetching && <div className="loader">Загрузка товаров...</div>}
      {items.length > 0 && !isFetching && (
        <div className={classes.list}>
          {items.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
      )}
      {items.length === 0 && !isFetching && <div className={classes.emptyListMessage}>Ничего не найдено</div>}
    </div>
  );
};

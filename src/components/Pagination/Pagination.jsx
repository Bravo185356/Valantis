import React from "react";
import classNames from "classnames";
import classes from "./Pagination.module.scss";

export const Pagination = ({ page, setPage, listType, numPages, isFetching }) => {
  const nextPaginationButton = classNames([["button", classes.paginationButton, classes.paginationNext]]);
  const prevPaginationButton = classNames([["button", classes.paginationButton]]);

  function changePage(page) {
    setPage(page);
    // При смене страницы отфильтрованных элементов, мы не делаем fetch и лоадер не отображается,
    // поэтому вручную скроллим в начало страницы
    if (listType === "filter") {
      window.scrollTo({
        top: 0,
      });
    }
  }

  return (
    <div className={classes.pagination}>
      {page !== 1 && (
        <button onClick={() => changePage(page - 1)} disabled={isFetching} className={prevPaginationButton}>
          Предыдущая
        </button>
      )}
      {page !== numPages && (
        <button onClick={() => changePage(page + 1)} disabled={isFetching} className={nextPaginationButton}>
          Следующая
        </button>
      )}
    </div>
  );
};

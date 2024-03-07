import { useState } from "react";
import classes from "./FilterSidebar.module.scss";
import { useFilterItems } from "../../hooks/useFilterItems";
import classNames from "classnames";

export const FilterSidebar = ({ setItems, setIsFetching, fetchItems, setListType, setPage, isFetching }) => {
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const [isFilterUsed, setIsFilterUsed] = useState(false);

  const fetchFilteredItems = useFilterItems();

  const buttonClasses = classNames(["button", classes.filterButton]);

  function getFilterParams() {
    const params = {};

    if (nameInput !== "") {
      params.product = nameInput;
    }
    if (priceInput !== "") {
      params.price = Number(priceInput);
    }
    if (brandInput !== "") {
      params.brand = brandInput;
    }

    return params;
  }

  function changePriceInput(e) {
    const lastSymbol = e.target.value.slice(-1);
    // Если очистили инпут, то обновляем значение
    // Если введенный символ не число, то не обновляем priceInput
    if (lastSymbol.match(/[0-9]/) || e.target.value.length === 0) {
      setPriceInput(e.target.value);
    }
  }

  function validateFilterForm() {
    return nameInput === "" && priceInput === "" && brandInput === "" ? false : true;
  }

  async function getFilteredItems(e) {
    e.preventDefault();
    const isValid = validateFilterForm();

    if (isValid) {
      const params = getFilterParams();

      setIsFetching(true);
      const items = await fetchFilteredItems(params);
      setItems(items);
      setIsFetching(false);

      setIsFilterUsed(true);
      setListType("filter");
      setPage(1);
    } else {
      fetchItems();
      setListType("all");
    }
  }

  function resetFilter(e) {
    e.preventDefault();

    setNameInput("");
    setPriceInput("");
    setBrandInput("");

    fetchItems();

    setPage(1)
    setIsFilterUsed(false);
    setListType("all");
  }

  return (
    <div className={classes.sidebar}>
      <div className={classes.title}>Фильтр</div>
      <form className={classes.filter}>
        <div className={classes.filterBlock}>
          <input
            className={classes.input}
            placeholder="Название"
            type="text"
            onChange={(e) => setNameInput(e.target.value)}
            value={nameInput}
          />
        </div>
        <div className={classes.filterBlock}>
          <input
            className={classes.input}
            placeholder="Цена"
            type="text"
            onChange={(e) => changePriceInput(e)}
            value={priceInput}
          />
        </div>
        <div className={classes.filterBlock}>
          <input
            className={classes.input}
            placeholder="Бренд"
            type="text"
            onChange={(e) => setBrandInput(e.target.value)}
            value={brandInput}
          />
        </div>
        <button className={buttonClasses} disabled={isFetching} onClick={(e) => getFilteredItems(e)}>
          Отфильтровать
        </button>
        {isFilterUsed && (
          <button onClick={(e) => resetFilter(e)} disabled={isFetching} className={buttonClasses}>
            Сбросить фильтр
          </button>
        )}
      </form>
    </div>
  );
};

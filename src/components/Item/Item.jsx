import React from "react";
import classes from "./Item.module.scss";

export const Item = ({ item }) => {
  return (
    <div className={classes.item}>
      <div>
        <span className={classes.infoName}>ID:</span> {item.id}
      </div>
      <div>
        <span className={classes.infoName}>Бренд:</span> {item.brand ? item.brand : "Нет"}
      </div>
      <div className={classes.name}>
        <span className={classes.infoName}>Название:</span> {item.product}
      </div>
      <div className={classes.price}>
        <span className={classes.infoName}>Цена:</span> {item.price}
      </div>
    </div>
  );
};

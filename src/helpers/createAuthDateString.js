const PASSWORD = "Valantis";

export function createAuthString() {
  const date = new Date();

  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (date.getMonth() + 1 < 10) {
    month = "0" + month;
  }

  if (date.getDate() < 10) {
    day = "0" + day;
  }

  return `${PASSWORD}_${date.getFullYear()}${month}${day}`;
}

import { createAuthString } from "../helpers/createAuthDateString";
import md5 from "md5";

let refetchLimit = 1;
let refetchCount = 0;

const BASE_URL = "https://api.valantis.store:41000/";

export async function fetchData(action, params) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        action,
        params,
      }),
      headers: {
        "X-Auth": md5(createAuthString()),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw response;
    } else {
      const data = await response.json();
      refetchCount = 0;
      return data.result;
    }
  } catch (error) {
    console.log(error.status);
    if (error.status === 500 && refetchLimit > refetchCount) {
      refetchCount = refetchCount + 1;
      return await fetchData(action, params);
    }
  }
}

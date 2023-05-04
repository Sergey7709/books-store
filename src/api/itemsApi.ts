import axios from "axios";
import { Item } from "../common/types";
import { BASE_URL } from "../common/constants";

// export type ItemFetchType = "get" | "post";

export const fetchItem = async (param: string) => {
  //   try {
  // switch (param) {
  //   case "/BooksList":
  //     // const responseGet = await axios.get(BASE_URL + params + "/" + id);
  const responseGet = await axios.get(`${BASE_URL}item/${param}`);
  console.log(responseGet.data);
  return responseGet.data;
  //   default:
  //     return;
  // }
  //   } catch (error) {
  //     console.error(`Ошибка запроса Item: ${error}`);
  //     throw error;
  //   }
};

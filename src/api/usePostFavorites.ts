import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { BASE_URL } from "../common/constants";
import { User } from "../common/types";
import { useAppSelector } from "../redux/redux.hooks";

type HandlersProps = {
  readonly open: () => void;
  //   readonly close: () => void;
  //   readonly toggle: () => void;
};

export const usePostFavorites = ({ open }: HandlersProps) => {
  const user: User | null = useAppSelector((stateAuth) => stateAuth.auth.user);

  const { mutateAsync } = useMutation(
    (param: string) => {
      return axios.post(`${BASE_URL}${param}`, undefined, {
        headers: {
          Authorization: user?.token ?? "",
        },
      });
    },
    {
      onSuccess: () => {
        console.log("favorite action");
      },
      onError: () => {
        notifications.show({
          message: "Ошибка при добавлении или удалении книги в избранном!",
          autoClose: 2000,
          color: "red",
        });
      },
    }
  );

  const favoritesChange = useCallback(
    async (bookId: number, favorite: boolean) => {
      if (!user) {
        notifications.show({
          message: "Войдите в аккаунт, чтобы добавить книгу в избранное!",
          autoClose: 5000,
          color: "red",
          fz: "md",
        });

        // handlers.open();
        open();
        return;
      }

      if (user) {
        if (favorite === false) {
          await mutateAsync(`user/favorites/${bookId}`, {});
          console.log("add favorite");
        } else if (favorite === true) {
          await mutateAsync(`user/favorites-remove/${bookId}`, {});
          console.log("del favorite");
        }
      }
    },
    [mutateAsync, user?.favoriteItems]
  );

  return { favoritesChange };
};

// type PostFavoritesProps = {
//   user: User | null;
//   handlers: {
//     open: () => void;
//     close: () => void;
//     toggle: () => void;
//   };
// };

// export const usePostFavorites = (props: PostFavoritesProps) => {
//   const { user, handlers } = props;

//   const { mutateAsync } = useMutation(
//     (param: string) => {
//       return axios.post(`${BASE_URL}${param}`, undefined, {
//         headers: {
//           Authorization: user?.token ?? "",
//         },
//       });
//     },
//     {
//       onSuccess: () => {
//         console.log("favorite action");
//       },
//       onError: () => {
//         notifications.show({
//           message: "Ошибка при добавлении или удалении книги в избранном!",
//           autoClose: 2000,
//           color: "red",
//         });
//       },
//     }
//   );

//   const favoritesChange = useCallback(
//     async (bookId: number, favorite: boolean) => {
//       if (!user) {
//         notifications.show({
//           message: "Войдите в аккаунт, что бы добавить книгу в избранное!",
//           autoClose: 5000,
//           color: "red",
//           fz: "md",
//         });

//         handlers.open();
//         return;
//       }

//       if (user) {
//         if (favorite === false) {
//           await mutateAsync(`user/favorites/${bookId}`, {});
//           console.log("add favorite");
//         } else if (favorite === true) {
//           await mutateAsync(`user/favorites-remove/${bookId}`, {});
//           console.log("del favorite");
//         }
//       }
//     },

//     [mutateAsync, user?.favoriteItems]
//   );
//   return favoritesChange;
// };

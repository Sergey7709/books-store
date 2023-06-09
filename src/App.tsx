import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { AppShell, Header } from "@mantine/core";
import { BooksList } from "./pages/catalog/BooksList";
import { useAutoLogin } from "./hooks/useAutoLogin";
import UserAccount from "./pages/userAccount/UserAccount";
import CustomScrollbar from "./components/customScrollbar/CustomScrollbar";
import { ScrollToTopButton } from "./components/scroll-to-top-button/ScrollToTopButton";
import ChatBot from "./components/chatBot/ChatBot";
import { Stocks } from "./pages/stocks/Stocks";
import { Favorites } from "./pages/favorites/Favorites";
import { AboutUs } from "./pages/aboutUs/AboutUs";
import { BookstoreServices } from "./pages/bookstoreServices/BookstoreServices";
import { Cart } from "./pages/cart/Cart";
import { Home } from "./pages/home/Home";
import HeaderMenu from "./components/headerMenu/HeaderMenu";
import { Error404 } from "./pages/error404/Error404";
import { ReaderBlogs } from "./pages/readerBlogs/ReaderBlogs";
import { BookCard } from "./pages/catalog/BookCard";
import { ReaderBlogsCard } from "./pages/readerBlogs/ReaderBlogsCard";

export const App = () => {
  useAutoLogin();

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />

        <AppShell
          header={
            <Header fixed={false} height={{ base: 100, md: 100 }} p="md">
              <HeaderMenu />
            </Header>
          }
        >
          <ChatBot />

          <CustomScrollbar>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/cart"} element={<Cart />} />
              <Route path={"/favorites"} element={<Favorites />} />
              <Route path={"/stocks"} element={<Stocks />} />
              <Route
                path={"/bookstores-services"}
                element={<BookstoreServices />}
              />
              <Route path={"/reader-blogs"} element={<ReaderBlogs />} />
              <Route
                path={"/reader-blog-card/:id"}
                element={<ReaderBlogsCard />}
              />
              <Route path={"/about-us"} element={<AboutUs />} />
              <Route path={"/books-list/:param"} element={<BooksList />} />
              <Route path={"/book-card/:id"} element={<BookCard />} />
              <Route path={"/user-account"} element={<UserAccount />} />
              <Route path={"*"} element={<Error404 />} />
            </Routes>

            <ScrollToTopButton />
          </CustomScrollbar>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

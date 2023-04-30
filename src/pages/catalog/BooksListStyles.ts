import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white,
    transition: "transform 150ms ease, box-shadow 150ms ease",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignContent: "center",
    alignItems: "center",

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows.md,
    },

    width: "14rem",
    height: "24rem",
    margin: "1rem",
  },

  discount: {
    position: "absolute",
    // top: theme.spacing.xs,
    top: "9px",
    left: rem(5),
    pointerEvents: "none",
  },

  action_favorite: {
    position: "absolute",
    top: "1px",
    right: "5px",
    padding: "0px",
    height: "3rem",
    width: "2rem",
    "&:hover": {
      transform: "scale(1.05)",
      fill: "red",
    },
  },
  favorite_on: {
    fill: "crimson",
    "&:hover": {
      transform: "scale(1.05)",
      fill: "cadetblue",
    },
  },
  favorite_off: {
    fill: "cadetblue",
    "&:hover": {
      transform: "scale(1.05)",
      fill: "crimson",
    },
  },

  buy: {
    position: "absolute",
    bottom: "10px",
    margin: "0px",
    // right: rem(5),
  },

  text: {
    position: "absolute",
    bottom: "55px",
    margin: "0px",
    left: "30px",
    // right: rem(5),
  },

  title: {
    display: "block",
    marginTop: rem(0),
    marginLeft: rem(0),
    marginBottom: rem(5),
  },

  grid: {
    [theme.fn.smallerThan("xs")]: {
      cols: 1,
      justifyContent: "center",
    },
    [theme.fn.smallerThan("sm")]: {
      cols: 2,
      // paddingLeft: "6%",
    },
    [theme.fn.smallerThan("md")]: {
      cols: 3,
      // paddingLeft: "5%",
    },
    [theme.fn.smallerThan("lg")]: {
      cols: 4,
      // paddingLeft: "3%",
    },
    [theme.fn.smallerThan("xl")]: {
      cols: 5,
      // paddingLeft: "3%",
    },
    [theme.fn.largerThan("xl")]: {
      cols: 7,
    },
  },
}));
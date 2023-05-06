import { Header, Menu, Group, Center, Grid, Flex } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES, NAV_BUTTONS } from "../../common/constants";
import { useAppDispatch } from "../../redux/redux.hooks";
import { currentFilter } from "../../redux/filterSlice";
import React, { useCallback, useMemo } from "react";
import { useStyles } from "./headerMenuStyles";
import HeaderToolBar from "./HeaderToolBar";
import { NavLink } from "react-router-dom";
import { MenuItem } from "./MenuItem";

const HeaderMenu = () => {
  console.log("render header");
  const { classes } = useStyles();
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const onClickToItem = useCallback(
  //   (link: string, param: string) => {
  //     console.log("render Click");
  //     dispatch(currentFilter(param));
  //     navigate(link);
  //   },
  //   [dispatch, navigate]
  // );

  // const menuCategory = useMemo(
  //   () =>
  //     CATEGORIES.map((item, ind) => (
  //       <Menu.Item
  //         onClick={() => onClickToItem(item.link, item.param)}
  //         key={ind}
  //       >
  //         {item.label}
  //       </Menu.Item>
  //     )),
  //   [onClickToItem]
  // );

  const items = useMemo(
    () =>
      NAV_BUTTONS.map((link) => (
        <Menu
          key={link.label}
          trigger={"click"}
          transitionProps={{ exitDuration: 0 }}
          withinPortal
          width="100%"
          position="bottom-start"
          offset={0}
        >
          <Menu.Target>
            {link.label === "Каталог" ? (
              <Flex align="center" className={classes.link}>
                {link.label}
                <IconChevronDown size="1rem" />
                {/* <Menu.Dropdown pl={40}>{menuCategory}</Menu.Dropdown> */}
                <Menu.Dropdown pl={40}>
                  <MenuItem />
                </Menu.Dropdown>
              </Flex>
            ) : (
              <NavLink to={link.link} className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                </Center>
              </NavLink>
            )}
          </Menu.Target>
        </Menu>
      )),
    // [classes.link, classes.linkLabel, menuCategory]
    [classes.link, classes.linkLabel]
  );

  return (
    <Header height={105} className={classes.header} m={"0px"}>
      <Grid m={10} gutter={"5px"}>
        <HeaderToolBar classes={classes} />
        <Grid.Col span={12}>
          <Group
            spacing={12}
            align="center"
            position="center"
            className={classes.links}
          >
            {items}
          </Group>
        </Grid.Col>
      </Grid>
    </Header>
  );
};

export default React.memo(HeaderMenu);

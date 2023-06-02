import { Button, Grid, Group, Input, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useAppSelector } from "../../redux/redux.hooks";
import { useDispatch } from "react-redux";
import {
  setMaxPrice,
  setMinPrice,
  setReset,
  setCategorySort,
} from "../../redux/sortSlice";

const PriceRange = () => {
  const { reset, minPrice, maxPrice } = useAppSelector((state) => state.sort); //!
  const dispatch = useDispatch(); //!

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [debouncedMin] = useDebouncedValue(min, 1000);
  const [debouncedMax] = useDebouncedValue(max, 1000);

  useEffect(() => {
    if (reset) {
      setMin("");
      setMax("");
      dispatch(setReset(false));
    } else {
      dispatch(setMinPrice(debouncedMin));
      dispatch(setMaxPrice(debouncedMax));
    }
  }, [debouncedMin, debouncedMax, reset]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMin(value);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMax(value);
    }
  };

  const handleReset = () => {
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    dispatch(setReset(true));
    dispatch(setCategorySort(""));
  };

  const isPriceNotValid =
    minPrice !== "" && maxPrice !== "" && Number(minPrice) >= Number(maxPrice);

  return (
    <Grid w={400} justify="start" align="center">
      <Grid.Col>
        <Group noWrap spacing={5}>
          <Text size="md" color="blue" weight={400}>
            Стоимость
          </Text>
          <Text size="md" color="blue" weight={400}>
            от
          </Text>
          <Input
            value={min}
            onChange={handleMinPriceChange}
            w={100}
            size="xs"
            placeholder="минимум"
            error={isPriceNotValid}
          />

          <Text size="md" color="blue" weight={400}>
            до
          </Text>
          <Input
            value={max}
            onChange={handleMaxPriceChange}
            w={100}
            size="xs"
            placeholder="максимум"
          />

          <Button
            onClick={handleReset}
            size="xs"
            variant="gradient"
            gradient={{ from: "red", to: "violet", deg: 60 }}
          >
            Сбросить
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default PriceRange;

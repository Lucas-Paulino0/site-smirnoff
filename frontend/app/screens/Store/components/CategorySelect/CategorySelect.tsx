import { Divider, List, ListItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Category } from "~/domain/Category";
import { getAllCategories } from "~/services/categoryServices";

type CategorySelectProps = {
  setCategory: (category: Category | undefined) => void;
};

export default function CategorySelect({ setCategory }: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>();
  const [selected, setSelected] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const category = categories?.find(
      (category) => category.name === window.location.hash.replace("#", "")
    );
    setSelected(category);
  }, [categories]);

  useEffect(() => {
    if (selected) {
      window.history.replaceState(null, "", `#${selected.name}`);
    }

    setCategory(selected);
  }, [selected]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories: Category[] = await getAllCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setCategory(selected);
  }, [selected]);

  return (
    <Stack
      alignItems="center"
      spacing={2}
      sx={{
        width: { xl: "20%", md: "30%", xs: "100%" },
      }}
    >
      <Typography
        color="primary"
        sx={{
          fontSize: 28,
        }}
      >
        Categorias
      </Typography>
      <Divider
        orientation="horizontal"
        sx={{
          border: "none",
          width: "100%",
          backgroundColor: "var(--mui-palette-primary-main)",
          padding: 0,
          height: 2,
          margin: "0 !important",
        }}
      />
      <List
        sx={{
          padding: 0,
          margin: "0 !important",
          width: "100%",
        }}
      >
        <ListItem
          onClick={() => setSelected(undefined)}
          sx={{
            cursor: "pointer",
            transition: "background-color 0.3s",
            backgroundColor: selected === undefined ? "#1b273d" : "transparent",
            "&:hover": {
              backgroundColor: "var(--background-secondary)",
            },
          }}
        >
          <Typography
            color={selected === undefined ? "primary" : "secondary"}
            textAlign={"start"}
            sx={{
              fontSize: 20,
              padding: 0,
              margin: 0,
            }}
          >
            Todos
          </Typography>
        </ListItem>
        {categories?.map((category) => (
          <ListItem
            key={category.id}
            onClick={() => setSelected(category)}
            sx={{
              cursor: "pointer",
              transition: "background-color 0.3s",
              backgroundColor:
                selected?.id === category.id ? "#1b273d" : "transparent",
              "&:hover": {
                backgroundColor: "var(--background-secondary)",
              },
            }}
          >
            <Typography
              key={category.id}
              color={selected?.id === category.id ? "primary" : "secondary"}
              textAlign={"start"}
              sx={{
                fontSize: 20,
                padding: 0,
                margin: 0,
              }}
            >
              {category.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

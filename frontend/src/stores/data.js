import { defineStore } from 'pinia';
import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";

export const useDataStore = defineStore('data', {
  state: () => ({
    doughs: doughJSON,
    ingredients: ingredientsJSON,
    sauces: saucesJSON,
    sizes: sizesJSON,
  }),
});
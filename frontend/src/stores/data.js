import { defineStore } from 'pinia';
import ingredientsConverter from "@/common/helpers/ingredientsConverter";
import saucesConverter from "@/common/helpers/sauceConverter";
import sizesConverter from "@/common/helpers/sizesConverter";
import doughConverter from "@/common/helpers/doughConverter";

export const useDataStore = defineStore('data', {
  state: () => ({
    doughs: doughConverter,
    ingredients: ingredientsConverter,
    sauces: saucesConverter,
    sizes: sizesConverter,
  }),
});
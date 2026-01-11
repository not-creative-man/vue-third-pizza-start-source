import ingredientsJSON from "@/mocks/ingredients.json";
import ingredientsMap from "@/common/enums/ingredients";

ingredientsJSON.forEach((e) => {
  e.name = ingredientsMap[e.value];
  e.image = `filling/${e.value}`;
});

export default ingredientsJSON;

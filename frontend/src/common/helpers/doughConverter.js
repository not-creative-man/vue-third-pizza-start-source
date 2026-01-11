import doughSizes from "@/common/data/doughSizes";
import dough from "@/mocks/dough.json";

dough.forEach((e) => {
  e.type = doughSizes[dough.id];
});

export default dough;

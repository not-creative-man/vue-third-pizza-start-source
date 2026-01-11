import saucesJSON from "@/mocks/sauces.json";
import sauces from "@/common/data/sauces";

saucesJSON.forEach((e) => {
  e.value = sauces[e.id];
});

export default saucesJSON;

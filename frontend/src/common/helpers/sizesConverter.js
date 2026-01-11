import sizesJSON from "@/mocks/sizes.json";
import sizes from "@/common/data/sizes";

sizesJSON.forEach((size) => {
  size.type = sizes[size.id];
});

export default sizesJSON;

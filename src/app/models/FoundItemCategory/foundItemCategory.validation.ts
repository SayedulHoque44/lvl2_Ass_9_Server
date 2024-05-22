import { z } from "zod";

const createFoundItemCategoryValidaion = z.object({
  body: z.object({
    name: z.string({
      required_error: "Found Category Name Required!",
    }),
  }),
});

export default createFoundItemCategoryValidaion;

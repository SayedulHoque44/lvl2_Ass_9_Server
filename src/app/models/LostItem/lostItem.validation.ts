import { z } from "zod";

const createLostItem = z.object({
  body: z.object({
    category: z.string({
      required_error: "category is required!",
    }),
    name: z.string({
      required_error: "name is required!",
    }),
    description: z.string({
      required_error: "description is required!",
    }),
  }),
});

//
export const lostItemValidation = {
  createLostItem,
};

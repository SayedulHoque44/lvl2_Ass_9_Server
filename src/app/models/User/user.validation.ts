import { z } from "zod";

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is Required!",
    }),
    email: z.string({ required_error: "Email is Requires!" }).email({
      message: "Enter a valid email!",
    }),
    password: z.string({
      required_error: "password is Required!",
    }),
    profile: z
      .object({
        bio: z.string({
          required_error: "bio is Required!",
        }),
        age: z
          .number({
            required_error: "age is Required!",
          })
          .optional(),
      })
      .optional(),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is Requires!" }).email({
      message: "Enter a valid email!",
    }),
    password: z.string({
      required_error: "password is Required!",
    }),
  }),
});

const updateProfile = z.object({
  body: z.object({
    bio: z
      .string({
        required_error: "bio is Required!",
      })
      .optional(),
    age: z
      .number({
        required_error: "age is Required!",
      })
      .optional(),
  }),
});

const userStatus = z.object({
  body: z.object({
    isActive: z.string({
      required_error: "isActive is Required!",
    }),
  }),
});

//
export const userValidations = {
  createUser,
  loginUser,
  updateProfile,
  userStatus,
};

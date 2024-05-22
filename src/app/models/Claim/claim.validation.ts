import { claimStatus } from "@prisma/client";
import { z } from "zod";

const createClaim = z.object({
  body: z.object({
    foundItemId: z.string({
      required_error: "foundItemId is required!",
    }),
    distinguishingFeatures: z.string({
      required_error: "distinguishingFeatures is required!",
    }),
    lostDate: z.string({
      required_error: "lostDate is required!",
    }),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([
      claimStatus.APPROVED,
      claimStatus.PENDING,
      claimStatus.REJECTED,
    ]),
  }),
});

//
export const claimValidaiton = {
  createClaim,
  updateStatus,
};

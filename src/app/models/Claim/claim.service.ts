import { Claim, claimStatus } from "@prisma/client";
import prisma from "../../../utils/prisma";

const createClaim = async (
  userId: string,
  payload: {
    foundItemId: string;
    distinguishingFeatures: string;
    lostDate: Date;
  }
) => {
  //
  await prisma.foundItem.findUniqueOrThrow({
    where: { id: payload.foundItemId },
  });

  //
  await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  //
  const result = await prisma.claim.create({
    data: {
      userId,
      ...payload,
    },
  });

  return result;
};
//

const getAll = async () => {
  const result = await prisma.claim.findMany({
    include: {
      foundItem: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  });

  return result;
};
//
const updateStatus = async (claimId: string, payload: { status: any }) => {
  await prisma.claim.findUniqueOrThrow({
    where: {
      id: claimId,
    },
  });

  const update = await prisma.claim.update({
    where: {
      id: claimId,
    },
    data: {
      status: payload.status,
    },
  });

  return update;
};
//
const updateClaimItemReport = async (id: string, payload: Partial<Claim>) => {
  //
  await prisma.claim.findUniqueOrThrow({
    where: {
      id,
    },
  });
  //
  const result = await prisma.claim.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getSingleById = async (id: string) => {
  await prisma.claim.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const res = await prisma.claim.findFirst({
    where: {
      id,
    },
  });

  return res;
};

const deleteSingleById = async (id: string) => {
  await prisma.claim.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const res = await prisma.claim.delete({
    where: {
      id,
    },
  });

  return res;
};

//
export const claimServices = {
  createClaim,
  updateStatus,
  getAll,
  updateClaimItemReport,
  getSingleById,
  deleteSingleById,
};

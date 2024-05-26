import { Claim, Prisma, claimStatus } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../../utils/paginationHelper";

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

const getAll = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.ClaimWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: ["distinguishingFeatures"].map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.ClaimWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  //
  const result = await prisma.claim.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    //
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
      //
      foundItem: true,
    },
  });

  const total = await prisma.foundItem.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//
const updateStatus = async (
  claimId: string,
  payload: { status: claimStatus }
) => {
  const claim = await prisma.claim.findUniqueOrThrow({
    where: {
      id: claimId,
    },
  });

  let result;
  //
  if (payload.status === claimStatus.APPROVED) {
    result = await prisma.$transaction(async (tx) => {
      //
      await tx.claim.updateMany({
        where: {
          foundItemId: claim.foundItemId,
        },
        data: {
          status: claimStatus.REJECTED,
        },
      });
      //
      const updatedClaim = await tx.claim.update({
        where: {
          id: claimId,
        },
        data: {
          status: payload.status,
        },
      });
      return updatedClaim;
    });
    //
  } else {
    result = await prisma.claim.update({
      where: {
        id: claimId,
      },
      data: {
        status: payload.status,
      },
    });
  }

  return result;
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

import { FoundItem, Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { paginationHelper } from "../../../utils/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { foundItemSearchAbleFields } from "./foundItem.constant";

const createFoundItemReport = async (userId: string, payload: any) => {
  //
  // await prisma.foundItemCategory.findUniqueOrThrow({
  //   where: {
  //     id: payload.categoryId,
  //   },
  // });
  //
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  //
  const result = await prisma.foundItem.create({
    data: {
      userId,
      ...payload,
    },
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
      // category: true,
    },
  });

  return result;
};

const getAll = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.FoundItemWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: foundItemSearchAbleFields.map((field) => ({
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

  const whereConditons: Prisma.FoundItemWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  //
  const result = await prisma.foundItem.findMany({
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
      Claim: true,
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

//
const updatefouondItemReport = async (
  id: string,
  payload: Partial<FoundItem>
) => {
  //
  await prisma.foundItem.findUniqueOrThrow({
    where: {
      id,
    },
  });
  //
  const result = await prisma.foundItem.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getSingleById = async (id: string) => {
  await prisma.foundItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const res = await prisma.foundItem.findFirst({
    where: {
      id,
    },
    include: {
      Claim: true,
    },
  });

  return res;
};

const deleteSingleById = async (id: string) => {
  await prisma.foundItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const res = await prisma.foundItem.delete({
    where: {
      id,
    },
  });

  return res;
};

//
export const foundItemReportServices = {
  createFoundItemReport,
  getAll,
  getSingleById,
  deleteSingleById,
  updatefouondItemReport,
};

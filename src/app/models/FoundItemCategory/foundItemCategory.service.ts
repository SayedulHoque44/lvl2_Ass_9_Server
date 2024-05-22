import prisma from "../../../utils/prisma";

const createFoundItemCategory = async (payload: { name: string }) => {
  const result = await prisma.foundItemCategory.create({
    data: payload,
  });

  return result;
};
const getAll = async () => {
  const result = await prisma.foundItemCategory.findMany();

  return result;
};

//
export const foundItemCategoryServices = {
  createFoundItemCategory,
  getAll,
};

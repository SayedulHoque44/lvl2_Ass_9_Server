import {
  Prisma,
  Profile,
  User,
  claimStatus,
  userRole,
  userStatus,
} from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TCreateUser, TLoginUser } from "./user.interface";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../../utils/paginationHelper";

const createUser = async (payload: TCreateUser) => {
  const { profile, ...userData } = payload;

  const isExitsUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (isExitsUser) {
    throw new Error(`${payload.email} is already exits!`);
  }

  const hashpassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashpassword;

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: { ...userData },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    let createdProfile;
    if (payload.profile) {
      createdProfile = await transactionClient.profile.create({
        data: {
          userId: createdUser.id,
          ...profile,
        },
      });
    }

    return { ...createdUser, profile: createdProfile };
  });

  return result;
};
//
const loginUser = async (payload: TLoginUser) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.access_Secrect as Secret,
    config.access_Secrect_Exp_in as string
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken,
  };
};
//
const getMe = async (userId: string) => {
  const userProfile = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      isActive: true,
    },
  });
  return userProfile;
};
//
const updateProfile = async (id: string, payload: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const userProfile = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return userProfile;
};

const changePassword = async (
  userId: string,
  payload: { currentPassword: string; newPassword: string }
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.currentPassword,
    user.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const hashpassword = await bcrypt.hash(payload.newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashpassword,
    },
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
//

const getAll = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: ["name", "email"].map((field) => ({
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

  const whereConditons: Prisma.UserWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  //
  const result = await prisma.user.findMany({
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
      FoundItem: true,
      LostItem: true,
      Claim: true,
    },
  });

  const total = await prisma.user.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateStatus = async (
  userId: string,
  payload: { isActive: userStatus }
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const update = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
  });
};

const userMeta = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  // if role admin
  if (user.role === userRole.ADMIN) {
    const totalUser = await prisma.user.count();
    const totolFoundItems = await prisma.foundItem.count();
    const totolLostItems = await prisma.lostItem.count();
    const totolClaimRequest = await prisma.claim.count({
      where: { status: claimStatus.PENDING },
    });
    const totolClaimedReport = await prisma.claim.count({
      where: { status: claimStatus.APPROVED },
    });

    return {
      totalUser,
      totolFoundItems,
      totolLostItems,
      totolClaimRequest,
      totolClaimedReport,
    };
  } else {
    //if role user
    const totalFoundItems = await prisma.foundItem.count({
      where: {
        userId,
      },
    });
    const totalLostItems = await prisma.lostItem.count({
      where: {
        userId,
      },
    });

    const totalClaimRequest = await prisma.claim.count({
      where: {
        userId,
      },
    });

    const totalClaimedReport = await prisma.claim.count({
      where: {
        userId,
        status: claimStatus.APPROVED,
      },
    });

    return {
      totalFoundItems,
      totalLostItems,
      totalClaimRequest,
      totalClaimedReport,
    };
    //
  }
};

export const userServices = {
  createUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  getAll,
  updateStatus,
  userMeta,
};

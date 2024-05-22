import { Profile, User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TCreateUser, TLoginUser } from "./user.interface";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

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
    },
    config.access_Secrect as Secret,
    config.access_Secrect_Exp_in as string
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: accessToken,
  };
};
//
const getMe = async (userId: string) => {
  const userProfile = await prisma.profile.findUniqueOrThrow({
    where: {
      userId,
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
    },
  });
  return userProfile;
};
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
export const userServices = {
  createUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
};

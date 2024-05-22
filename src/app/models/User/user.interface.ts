export type TCreateUser = {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
};
export type TLoginUser = {
  email: string;
  password: string;
};

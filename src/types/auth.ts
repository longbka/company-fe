export type LoginInfo = {
  username: string;
  password: string;
};

export type RegisterInfo = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
};

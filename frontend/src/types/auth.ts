export type LoginType = {
  errors: {
    email?: string[];
    password?: string[];
    formError?: string[];
    verified?: string[];
  };
  success?: boolean;
};

export type RegisterType = {
  errors: {
    name?: string[];
    phone_number?: string[];
    email?: string[];
    password1?: string[];
    password2?: string[];
    formError?: string[];
  };
};

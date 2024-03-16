interface RegisterUserInput {
  email: string;
  username: string;
  password: string;
  name: string;
}

interface SigninUserInput {
  email: string;
  password: string;
}

interface UpdateUserInput {
  email: string;
  username: string;
  name: string;
}

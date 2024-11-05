import axios from 'axios';

export const apiSignUp = async (args: { email: string; password: string }) => {
  const url = `${process.env.REACT_APP_API_URL}/api/user/signup`;
  const reqBody = {
    email: args.email,
    password: args.password
  };

  const res = await axios.post(url, reqBody);

  return res;
};

export const apiLogin = async (args: { email: string; password: string }) => {
  const url = `${process.env.REACT_APP_API_URL}/api/user/login`;
  const reqBody = {
    email: args.email,
    password: args.password
  };

  const res = await axios.post(url, reqBody);

  return res;
};



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

export const apiSendOtp = async(email: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/user/generate`
  const reqBody = {
    email: email
  }

  const res = await axios.post(url, reqBody)

  return res;
}

export const apiResetPasswd = async (args: {email: string, otp: string, passwd: string}) => {
  const url = `${process.env.REACT_APP_API_URL}/api/user/reset-pw`;

  const reqBody = {
    email: args.email,
    newPassword: args.passwd,
    otp: args.otp
  }

  const res = await axios.post(url, reqBody)

  return res
}


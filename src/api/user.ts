import axios from 'axios';
import { sendPostFormDataWithToken } from '../utils';

export const apiUpdateUser = async (
  args: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: string;
    phone: string;
    address: string;
  },
  token: any
) => {
  const url = `${process.env.REACT_APP_API_URL}/api/user/update`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.put(url, args, config);

  return res;
};

export const apiGetAllUsers = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/user/all`;

  const config = {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const {data} = await axios.get(url, config);

  return data ?? {};
};

import axios from 'axios';

export const apiCreateOrder = async(args: { cartIds: number[] },token:string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/create`;
  const reqBody = {
    cartIds: args.cartIds,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.post(url, reqBody,config);

  return res;
};

export const apiGetMyOrder = async(token:string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/my-orders`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.get(url,config);

  return res;
};

export const apiOrderDetails = async(token:string,id:number) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/detail/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.get(url,config);

  return res;
};
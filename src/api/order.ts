import axios from 'axios';
import { getWithToken, sendPostFormDataWithToken } from '../utils';

export const apiCreateOrder = async (
  args: { cartIds: number[] },
  token: string
) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/create`;
  const reqBody = {
    cartIds: args.cartIds
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.post(url, reqBody, config);

  return res;
};

export const apiGetMyOrder = async (token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/my-orders`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.get(url, config);

  return res;
};

export const apiOrderDetails = async (token: string, id: number) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/detail/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.get(url, config);

  return res;
};

export const apiConfirmReceiveOrder = async (args: {
  orderId: string;
  token: string;
}) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/received`;

  return sendPostFormDataWithToken({
    url: url,
    data: { orderId: args.orderId },
    token: args.token
  });
};

export const apiCancelOrder = async (args: {
  orderId: string;
  token: string;
}) => {
  const { orderId, token } = args;
  const url = `${process.env.REACT_APP_API_URL}/api/order/cancel/${orderId}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.delete(url, config);

  return res;
};

export const apiTransferOrderToCarrier = async (args: {
  orderId: string;
  token: string;
}) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/shipping`;

  return sendPostFormDataWithToken({
    url: url,
    data: { orderId: args.orderId },
    token: args.token
  });
};

export const apiAdminConfirmOrder = async (args: {
  orderId: string;
  token: string;
}) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/confirm`;

  return sendPostFormDataWithToken({
    url: url,
    data: { orderId: args.orderId },
    token: args.token
  });
};

export const apiDoneOrder = async (args: {
  orderId: string;
  token: string;
}) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/finish`;

  return sendPostFormDataWithToken({
    url: url,
    data: { orderId: args.orderId },
    token: args.token
  });
};

export const apiGetAllOrders = async (token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order/all`;

  return getWithToken({url, token})
};

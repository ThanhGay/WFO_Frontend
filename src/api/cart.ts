import axios from 'axios';
export const apiAddCart = async (args: { productId: number; quantity: number; note:string | null; }, token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/cart/add-to-cart`;

  const reqBody = {
    productId: args.productId,
    quantity: args.quantity,
    note: args.note
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
export const apiGetCart = async (token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/cart/my-cart`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.get(url,config);

  return res;
};

export const apiDeleteCart = async (id: any, token: any) => {
  const url = `${process.env.REACT_APP_API_URL}/api/cart/delete/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.delete(url, config);

  return res;
};

export const apiIncreaseCart = async (id: any, token: any) => {
  const url = `${process.env.REACT_APP_API_URL}/api/cart/increase/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.put(url, config);

  return res;
};

export const apiDecreaseCart = async (id: any, token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/cart/decrease/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.put(url, config);

  return res;
};


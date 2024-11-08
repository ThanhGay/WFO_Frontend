import axios from 'axios';
export const apiAddCart = async (args: { productId: number; quantity: number; note:string | null; }, token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/cart`;

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
export const apiGetCart = async (

  token: string
) => {
  const url = `${process.env.REACT_APP_API_URL}/api/cart`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.get(url,config);

  return res;
};

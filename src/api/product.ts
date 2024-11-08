import axios from 'axios';
import { sendPostFormDataWithToken } from '../utils';

export const apiCategories = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/category/all/`;

  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  return data ?? {};
};

export const apiSearch = async (keyword: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/product/all?keyword=${keyword}`;

  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  console.log(data);

  return data ?? {};
};

export const apiProduct = async (categoryID: any) => {
  const url = `${process.env.REACT_APP_API_URL}/api/product/all/${categoryID}`;
  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  return data ?? {};
};

export const apiPostProduct = async (
  args: {
    name: string;
    description: string;
    price: number;
    imageFile?: File;
    size: string;
    categoryId?: number;
  },
  token: string
) => {
  const url = `${process.env.REACT_APP_API_URL}/api/product/add`;

  const { name, description, price, imageFile, size, categoryId } = args;

  if (categoryId && imageFile) {
    return sendPostFormDataWithToken({ url, data: args, token });
  } else if (!categoryId && imageFile) {
    return sendPostFormDataWithToken({
      url,
      data: { name, description, price, imageFile, size },
      token
    });
  } else if (!categoryId && !imageFile) {
    return sendPostFormDataWithToken({
      url,
      data: { name, description, price, size },
      token
    });
  }
};

export const apiProductGetID = async (ID: any) => {
  const url = `${process.env.REACT_APP_API_URL}/api/product/get/${ID}`;
  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });
  return data ?? {};
};

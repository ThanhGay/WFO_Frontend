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

export const apiAllProduct = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/product/all`;

  const { data } = await axios.get(url, {
    headers: {
      'ngrok-skip-browser-warning': 'any_value'
    }
  });

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

export const apiUpdateProduct = async (
  args: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    imagefile: string ;
    size: string;
    categoryId: string;

  },
  token: any
) => {
  const url = `${process.env.REACT_APP_API_URL}/api/product/update`;
  const formData = new FormData();
  formData.append('id', args.id);
  formData.append('name', args.name);
  formData.append('description', args.description);
  formData.append('price', args.price);
  formData.append('image', args.image);
  formData.append('imageFile', args.imagefile);
  formData.append('size', args.size);
  formData.append('categoryId', args.categoryId); 

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value',
    },
  };

  const res = await axios.put(url, formData, config);

  return res;
};

export const apiDeleteProduct = async (productId: number, token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/api/product/delete?productId=${productId}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'any_value'
    }
  };

  const res = await axios.delete(url, config);

  return res;
};

import axios from 'axios';
import { sendPostFormDataWithToken } from '../utils';

  export const apiUpdateUser = async (args:{firstName:string,lastName:string,dateOfBirth:Date ,sex:string,phone:string}, token: any) => {
    const url = `${process.env.REACT_APP_API_URL}/api/user/update`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'any_value'
      }
    };

    const res = await axios.put(url,args, config);

    return res;
  };

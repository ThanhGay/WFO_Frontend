import axios from "axios";
export const apiUpdateCategories = async (args:{id:string,name:string,image:string,imagefile:string} ,token: any) => {
    const url = `${process.env.REACT_APP_API_URL}/api/category/update`;
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'any_value'
      }
    };
    const formData = new FormData();
    formData.append("id", args.id);
    formData.append("name", args.name);
    formData.append("image", args.image);
    formData.append("imagefile", args.imagefile);
  
    const res = await axios.put(url,formData,config);
  
    return res;
  };

  export const apiAddCategories = async ( args:{name:string,imagefile:File},token: any) => {
    const url = `${process.env.REACT_APP_API_URL}/api/category/add`;
    const formData = new FormData();
    formData.append("name", args.name);
    formData.append("imageFile", args.imagefile);
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'any_value'
      }
    };
  
    const res = await axios.post(url,formData,config);
  
    return res;
  };

  export const apiDeleteCategories = async (categoryId: number, token: string) => {
    const url = `${process.env.REACT_APP_API_URL}/api/category/delete?categoryId=${categoryId}`;
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'any_value'
      }
    };
  
    const res = await axios.delete(url, config);
  
    return res;
  };


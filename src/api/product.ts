import axios from "axios";
import internal from "stream";

export const apiCategories = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/category/all/`;
    
  
    const {data} = await axios.get(url, {
        headers:{
            'ngrok-skip-browser-warning':'any_value'
        }
    });
    return data ?? {};
  }

  export const apiSearch = async (keyword:string) => {
    const url =  `${process.env.REACT_APP_API_URL}/api/product/all?keyword=${keyword}`;
    
    const {data} = await axios.get(url, {
        headers:{
            'ngrok-skip-browser-warning':'any_value'
        }
    });
    console.log(data);
    
    
    return data ?? {};
  }

  export const apiProduct = async (categoryID: any) => {
    const url = `${process.env.REACT_APP_API_URL}/api/product/all/${categoryID}`;
    const {data} = await axios.get(url,{
        headers:{
            'ngrok-skip-browser-warning':'any_value'
        }
    })    
    return data ?? {};
  }

  export const apiProductGetID = async (ID: any) => {
    const url = `${process.env.REACT_APP_API_URL}/api/product/get/${ID}`;
    const {data} = await axios.get(url,{
        headers:{
            'ngrok-skip-browser-warning':'any_value'
        }
    })    
    return data ?? {};
  }
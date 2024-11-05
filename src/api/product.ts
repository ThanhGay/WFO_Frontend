import axios from "axios";

export const apiCategories = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/category/all/`;
    
  
    const {data} = await axios.get(url, {
        headers:{
            'ngrok-skip-browser-warning':'any_value'
        }
    });
    return data ?? {};
  }

  export const apiSearch = async () => {
    const url =  `${process.env.REACT_APP_API_URL}/api/product/all`;
    const {data} = await axios.get(url, {
        headers:{
            'ngrok-skip-browser-warning':'any_value'
        }
    });
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
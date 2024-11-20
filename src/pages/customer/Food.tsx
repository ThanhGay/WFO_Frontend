import BackHeader from '../../components/header/BackHeader';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import Search from '../../img/search.png';
import Cart1 from '../../img/Cart1.png';
import CartFood from '../../components/card/CartFood';
import Burger1 from '../../img/Burger1.png';
import CardRestaurant from '../../components/card/CardRestaurant';
import Restaurant from '../../img/Restaurant.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiCategories, apiProduct, apiProductGetID } from '../../api/product';
import CardCategory from '../../components/card/CardCategory';
import Cart from '../../img/basket.png'

function Food() {
  const [option, setOption] = useState('');
  const [product, setProduct] = useState([]);
  const [categories,setCategories] = useState([])
  const location = useLocation();
  const { category } = location.state || {};
  const callAPI = async (selectedCategory?: string) => {
    const dataRes = await apiProduct(selectedCategory ||category);
    setProduct(dataRes.items);
    
  };
  useEffect(() => {
    callAPI();
  }, [category]);


useEffect(()=>{
  const fetchOption = async () =>{
    const categoryRes = await apiCategories ()
    setCategories(categoryRes.items)  
  }
  fetchOption()
},[])

  

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCategory = event.target.value;
    setOption(selectedCategory);
    callAPI(selectedCategory); // Fetch sản phẩm khi lựa chọn một danh mục
  };

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/homedetails/searchbyname');
  };
  const handleCart = () => {
    navigate('/cart');
  };

  return (
    <div className=" py-3 px-3">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row">
          <BackHeader title=""></BackHeader>
          <Box>
            <FormControl
              sx={{
                width: '85px',
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  fontSize: '0.75rem'
                }
              }}
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: '0.875rem' }}
              >
                Option
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                label="Option"
                onChange={handleChange}
              >
                   {categories.map((items: any) => (
                  <MenuItem key={items.id} value={items.id}>
                    {items.name} {/* Hiển thị tên danh mục */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <img className="size-10" src={Search} onClick={handleSearch} />
          <img className="size-10" src={Cart}  onClick={handleCart}/>
        </div>
      </div>
      <p>Popular Burger</p>
      <div className="items-center grid grid-cols-2 gap-4 place-items-center">
        {product.map((item: any) => (
          <CartFood
          key={item.id}
            imageSrc={item?.image ? `${process.env.REACT_APP_API_URL}/${item.image}`: Burger1}
            navigateTo={`/homedetails/food/fooddetails`}
            textMeal={item.name}
            textSize={item.size}
            textPrice={item.price.toLocaleString('VN-vi')}
            textRestaurant={item.description}
            id={item.id}
          />
        ))}
      </div>
      <p>Open Restaurant</p>
      <CardRestaurant
        imgSrc={Restaurant}
        textInf="Burger - Chiken - Riche - Wings "
        textRestaurant="Rose garden restaurant"
        navigateTo=""
      ></CardRestaurant>
    </div>
  );
}

export default Food;

import BackHeader from '../components/header/BackHeader';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import Search from '../img/search.png';
import Cart1 from '../img/Cart1.png';
import CartFood from '../components/card/CartFood';
import Burger1 from '../img/Burger1.png';
import CardRestaurant from '../components/card/CardRestaurant';
import Restaurant from '../img/Restaurant.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiProduct, apiProductGetID } from '../api/product';
import CardCategory from '../components/card/CardCategory';

function Food() {
  const [option, setOption] = useState('');
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const { category } = location.state || {};
  const callAPI = async () => {
    const dataRes = await apiProduct(category);
    setProduct(dataRes.items);
  };
  useEffect(() => {
    callAPI();
  }, [category]);

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/homedetails/searchbyname');
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
                <MenuItem value={10}>Burger</MenuItem>
                <MenuItem value={20}>Pizza</MenuItem>
                <MenuItem value={30}>Bread</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <img className="size-10" src={Search} onClick={handleSearch} />
          <img className="size-10" src={Cart1} />
        </div>
      </div>
      <p>Popular Burger</p>
      <div className="  grid grid-cols-2 gap-4">
        {product.map((item: any) => (
          <CartFood
            imageSrc={Burger1}
            navigateTo={`/homedetails/food/fooddetails`}
            textMeal={item.name}
            textSize={item.size}
            textPrice={item.categoryId}
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

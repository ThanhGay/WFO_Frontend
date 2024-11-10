import { Route, Routes } from 'react-router-dom';
import {
  AdminAddProduct,
  AdminHome,
  AdminReport,
  Layout,
  Login,
  NoPage,
  Profile,
  Signup
} from './pages';
import './App.css';
import HomeDetails from './pages/customer/HomeDetails';
import SearchByName from './pages/customer/SearchByName';
import AllCategories from './pages/customer/AllCategories';
import Food from './pages/customer/Food';
import FoodSearch from './pages/customer/FoodSearch';
import FoodDetails from './pages/customer/FoodDetails';
import Cart from './pages/customer/Cart';
import Payment from './pages/customer/Payment';
import ResetPW from './pages/ResetPW';
import { Update } from '@mui/icons-material';
import UpdateProduct from './pages/admin/UpdateProduct';


function App() {
  return (
    <Routes>
      <Route path="/" index element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resetpassword" element={<ResetPW />} />
      <Route path="*" element={<NoPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/homedetails" element={<HomeDetails/>}/>
      <Route path='/homedetails/searchbyname' element={<SearchByName/>} />
      <Route path='/homedetails/food' element={<Food/>}/>
      <Route path='/homedetails/foodsearch' element={<FoodSearch/>}/>
      <Route path='/homedetails/allcategories' element={<AllCategories/>}/>
      <Route path='/homedetails/food/fooddetails' element={<FoodDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payment' element={<Payment />} />

      <Route path="/admin/product/create" element={<AdminAddProduct />} />
      <Route path="/admin/product/update" element={<UpdateProduct />} />
      <Route path="/admin" element={<AdminHome />}>
        <Route path="report" element={<AdminReport />} />
      </Route>
    </Routes>
  );
}

export default App;

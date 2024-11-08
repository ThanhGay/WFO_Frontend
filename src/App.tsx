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
import HomeDetails from './pages/HomeDetails';
import SearchByName from './pages/SearchByName';
import AllCategories from './pages/AllCategories';
import Food from './pages/Food';
import FoodSearch from './pages/FoodSearch';
import FoodDetails from './pages/FoodDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
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
      <Route path="/admin" element={<AdminHome />}>
        <Route path="report" element={<AdminReport />} />
      </Route>
    </Routes>
  );
}

export default App;

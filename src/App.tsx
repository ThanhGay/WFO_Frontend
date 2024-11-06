import { Route, Routes } from 'react-router-dom';
import {
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
import FoodDetails from './pages/Food';
import AllCategories from './pages/AllCategories';
import Cart from './pages/FoodDetails';
import FoodDetailsSearch from './pages/FoodSearch';

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
      <Route path='/homedetails/food' element={<FoodDetails/>}/>
      <Route path='/homedetails/foodsearch' element={<FoodDetailsSearch/>}/>
      <Route path='/homedetails/allcategories' element={<AllCategories/>}/>
      <Route path='/homedetails/food/fooddetails' element={<Cart/>}/>


      <Route path="/admin" element={<AdminHome />}>
        <Route path="report" element={<AdminReport />} />
      </Route>
    </Routes>
  );
}

export default App;

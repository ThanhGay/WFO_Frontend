import { Route, Routes } from 'react-router-dom';
import {
  AdminAddProduct,
  AdminHome,
  AdminReport,
  ConfirmOTP,
  Layout,
  Login,
  NoPage,
  MenuProfile,
  Profile,
  Signup,
  AdminListCustomer,
  AdminListOrder
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
import { usePageAuth } from './utils/hooks';
import OrderSuccess from './pages/customer/OrderSuccess';
import EditAdress from './pages/customer/EditAdress';
import MyOrder from './pages/customer/MyOrder';
import InfoOrder from './pages/customer/InfoOrder';
import Product from './pages/admin/Product';
import Categories from './pages/admin/Categories';
import AddCategories from './pages/admin/AddCategories';
import ProductEdit from './pages/admin/ProductEdit';

function App() {
  // usePageAuth()
  return (
    <Routes>
      <Route path="/" index element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-pw" element={<ResetPW />} />
      <Route path="/confirm" element={<ConfirmOTP />} />
      <Route path="*" element={<NoPage />} />
      <Route path="/profile" element={<MenuProfile />} />
      <Route path="/profile/information" element={<Profile />} />
      <Route path="/homedetails" element={<HomeDetails />} />
      <Route path="/homedetails/searchbyname" element={<SearchByName />} />
      <Route path="/homedetails/food" element={<Food />} />
      <Route path="/homedetails/foodsearch" element={<FoodSearch />} />
      <Route path="/homedetails/allcategories" element={<AllCategories />} />
      <Route path="/homedetails/food/fooddetails" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/ordersuccess" element={<OrderSuccess />} />
      <Route path="/editaddress" element={<EditAdress />} />
      <Route path="/myorder" element={<MyOrder />} />
      <Route path="/myorder/infomationorder" element={<InfoOrder />} />
      <Route path="/product" element={<Product />} />
      <Route path="/productedit" element={<ProductEdit />} />
      <Route path="/categories" element={<Categories />} />

      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/product/create" element={<AdminAddProduct />} />
      <Route path="/admin/categories/create" element={<AddCategories />} />
      <Route path="/admin/report" element={<AdminReport />} />
      <Route path="/admin/customer" element={<AdminListCustomer />} />
      <Route path="/admin/order" element={<AdminListOrder />} />
    </Routes>
  );
}

export default App;

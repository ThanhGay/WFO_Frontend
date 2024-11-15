import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ShoppingCart, Person, FactCheck, Home } from '@mui/icons-material';

function CustomBottomNavigation({ screen }: { screen: any }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(screen);

  useEffect(() => {
    const savedValue = localStorage.getItem('bottomNavValue');
    if (savedValue) {
      setValue(savedValue);
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate('/' + newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: '100%',
        backgroundColor: '#F0F0F0',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px 10px 0 0',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="homedetails"
        icon={<Home />}
      />
      <BottomNavigationAction
        label="Order"
        value="favorites"
        icon={<FactCheck />}
      />
      <BottomNavigationAction
        label="Cart"
        value="cart"
        icon={<ShoppingCart />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<Person />}
      />
    </BottomNavigation>
  );
}

export default CustomBottomNavigation;

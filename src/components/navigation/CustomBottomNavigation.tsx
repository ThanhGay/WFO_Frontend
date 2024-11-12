import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ShoppingCart, Person, FactCheck, Home } from '@mui/icons-material';

function CustomBottomNavigation() {
  const navigate = useNavigate();

  const [value, setValue] = useState(
    localStorage.getItem('bottomNavValue') || 'recents'
  );

  useEffect(() => {
    const savedValue = localStorage.getItem('bottomNavValue');
    if (savedValue) {
      setValue(savedValue);
    }
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    localStorage.setItem('bottomNavValue', newValue);
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
        value="recents"
        icon={<Home />}
        onClick={() => handleNavigation('/homedetails')}
      />
      <BottomNavigationAction
        label="Order"
        value="favorites"
        icon={<FactCheck />}
      />
      <BottomNavigationAction
        label="Cart"
        value="nearby"
        icon={<ShoppingCart />}
        onClick={() => handleNavigation('/cart')}
      />
      <BottomNavigationAction
        label="Profile"
        value="folder"
        icon={<Person />}
        onClick={() => handleNavigation('/profile')}
      />
    </BottomNavigation>
  );
}

export default CustomBottomNavigation;

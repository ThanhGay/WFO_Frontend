import BackHeader from '../../components/header/BackHeader';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import Search from '../../img/search.png';
import CartFood from '../../components/card/CartFood';
import Burger1 from '../../img/Burger1.png';
import CardRestaurant from '../../components/card/CardRestaurant';
import Restaurant from '../../img/Restaurant.png';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  apiCategories,
  apiDeleteProduct,
  apiProduct,
  apiProductGetID,
  apiUpdateProduct
} from '../../api/product';
import CardCategory from '../../components/card/CardCategory';
import Cart from '../../img/basket.png';
import Add from '../../img/add.png';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../redux/hook';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

const { confirm } = Modal;
interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  imageFile?: string | null;
  size: string;
  categoryId: string;
  price: string;
}

interface Category {
  id: number;
  name: string;
}

function ProductEdit() {
  const [option, setOption] = useState('');
  const [product, setProduct] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const { token } = useAppSelector((state) => state.authState);
  const [categories, setCategories] = useState<Category[]>([]);
  const location = useLocation();
  const { category } = location.state || {};
  const callAPI = async (selectedCategory?: string) => {
    const dataRes = await apiProduct(selectedCategory || category);
    setProduct(dataRes.items);
  };
  useEffect(() => {
    callAPI();
  }, [category]);

  useEffect(() => {
    const fetchOption = async () => {
      const categoryRes = await apiCategories();
      setCategories(categoryRes.items);
    };
    fetchOption();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCategory = event.target.value;
    setOption(selectedCategory);
    callAPI(selectedCategory); // Fetch sản phẩm khi lựa chọn một danh mục
  };

  const navigate = useNavigate();
  const handleAdd = () => {
    navigate('/admin/product/create');
  };

  const handleClickOpen = (product: Product) => {
    setCurrentProduct(product);
    setOpen(true); // Mở dialog
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null); // Đặt lại khi đóng dialog
  };

  const handleSave = async () => {
    // console.log('currentCategory:', currentCategory);
    if (currentProduct) {
      try {
        const args = {
          id: currentProduct.id, // Chuyển đổi sang number
          name: currentProduct.name,
          image: currentProduct.image || '',
          imagefile: currentProduct.imageFile || '', // Tệp ảnh dưới dạng base64
          description: currentProduct.description,
          size: currentProduct.size,
          price: currentProduct.price,
          categoryId: currentProduct.categoryId
        };

        const res = await apiUpdateProduct(args, token);

        const updatedProduct = res.data;
        setCurrentProduct(updatedProduct);

        // Cập nhật danh sách
        setProduct((prev) =>
          prev.map((cat) =>
            cat.id === currentProduct.id ? { ...cat, ...updatedProduct } : cat
          )
        );

        handleClose(); // Đóng dialog
      } catch (error) {
        console.error('Lỗi khi cập nhật danh mục:', error);
      }
    }
  };

  const handleInputChange = (field: keyof Product, value: string) => {
    setCurrentProduct((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCurrentProduct((prev) => {
        if (!prev) return null;
        return { ...prev, imageFile: e.target?.result?.toString() || '' }; // Chuyển sang string
      });
    };
    reader.readAsDataURL(file); // Chuyển file sang base64 string
  };

  const handleDeleteProduct = (productId: number) => {
    confirm({
      title: 'Delete Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this category?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const res = await apiDeleteProduct(productId, token);
          if (res.status === 200) {
            alert('Delete product successfully');
            setCategories((prev) =>
              prev.filter((item) => item.id !== productId)
            );
          } else {
            alert('An error occurred');
          }
        } catch (error) {
          console.error('Error when deleting product type:', error);
          alert('An error occurred while deleting the product type');
        }
      },
      onCancel() {
        console.log('Cancel');
      }
    });
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
          <img className="size-10" src={Add} onClick={handleAdd} />
        </div>
      </div>
      <div className="  ">
        {product.map((item: any) => (
          //   <CartFood
          //   key={item.id}
          //     imageSrc={item?.image ? `${process.env.REACT_APP_API_URL}/${item.image}`: Burger1}
          //     navigateTo={`/homedetails/food/fooddetails`}
          //     textMeal={item.name}
          //     textSize={item.size}
          //     textPrice={item.price.toLocaleString('VN-vi')}
          //     textRestaurant={item.description}
          //     id={item.id}
          //   />
          <div className="overflow-auto gap-3 py-4">
            <div className="bg-slate-400 w-full rounded-lg flex gap-4">
              <img
                className="size-20 rounded-lg  "
                src={
                  item?.image
                    ? `${process.env.REACT_APP_API_URL}/${item.image}`
                    : Burger1
                }
              />
              <div>
                <div className="flex gap-8 ">
                  <p className="text-lg font-medium">{item.name}</p>
                  <p>#{item.id}</p>
                </div>
                <p>Size: {item.size}</p>
                <p className="text-slate-500 line-clamp-1">
                  {item.description}
                </p>
                <div>
                  <p className="font-semibold">
                    {' '}
                    Price: {item.price.toLocaleString('VN-vi')}đ
                  </p>
                  <div className="flex pt-10">
                    <EditIcon
                      onClick={() => handleClickOpen(item)}
                      className="cursor-pointer text-blue-300 hover:text-blue-500"
                      style={{ fontSize: '1.5rem' }}
                    />
                    <DeleteIcon
                      className="cursor-pointer text-red-300 hover:text-red-500"
                      onClick={() => handleDeleteProduct(item.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentProduct && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="ID"
              type="text"
              fullWidth
              value={currentProduct.id}
              disabled
            />
            <TextField
              margin="dense"
              label="CategoriesId"
              type="text"
              fullWidth
              value={currentProduct?.categoryId || ''}
              disabled
            />
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={currentProduct.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={currentProduct.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Price"
              type="text"
              fullWidth
              value={currentProduct.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Size"
              type="text"
              fullWidth
              value={currentProduct.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
            />
            <TextField
              margin="dense"
              label="Image"
              type="text"
              fullWidth
              value={currentProduct.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default ProductEdit;

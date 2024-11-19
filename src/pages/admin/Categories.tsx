import { useNavigate } from 'react-router-dom';
import BackHeader from '../../components/header/BackHeader';
import Add from '../../img/add.png';
import { useEffect, useState } from 'react';
import { apiCategories } from '../../api/product';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { apiDeleteCategories, apiUpdateCategories } from '../../api/category';
import { useAppSelector } from '../../redux/hook';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'antd'; // Import Modal từ Ant Design
import { ExclamationCircleOutlined } from '@ant-design/icons'; // Icon cảnh báo

const { confirm } = Modal;

interface Category {
  id: number;
  name: string;
  image: string;
  imageFile?: string | null; // Thêm để xử lý tệp
  createdDate: string | null;
  updateDate: string | null;
}

function Categories() {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.authState);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleClickOpen = (category: Category) => {
    setCurrentCategory(category); // Lưu category được chọn
    setOpen(true); // Mở dialog
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCategory(null); // Đặt lại khi đóng dialog
  };

  const handleSave = async () => {
    // console.log('currentCategory:', currentCategory);
    if (currentCategory) {
      try {
        const args = {
          id: currentCategory.id.toString(),
          name: currentCategory.name,
          image: currentCategory.image || '',
          imagefile: currentCategory.imageFile || '' // Tệp ảnh dưới dạng base64
        };

        const res = await apiUpdateCategories(args, token);

        const updatedCategory = res.data;
        setCurrentCategory(updatedCategory);

        // Cập nhật danh sách
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === currentCategory.id ? { ...cat, ...updatedCategory } : cat
          )
        );

        handleClose(); // Đóng dialog
      } catch (error) {
        console.error('Lỗi khi cập nhật danh mục:', error);
      }
    }
  };

  const handleInputChange = (field: keyof Category, value: string) => {
    setCurrentCategory((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const handleFileChange = (file: File) => {
    console.log(file); // Check if the file is being selected properly
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target?.result); // Log the base64 string
      setCurrentCategory((prev) => {
        if (!prev) return null;
        return { ...prev, imageFile: e.target?.result?.toString() || '' }; // Set the base64 string
      });
    };
    reader.readAsDataURL(file); // Convert the file to base64
  };

  useEffect(() => {
    (async () => {
      const dataRes = await apiCategories();
      if (dataRes) {
        setCategories(dataRes.items);
      }
    })();
  }, []);
  const handleDeleteCategories = (categoriesId: number) => {
    confirm({
      title: 'Delete Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this category?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const res = await apiDeleteCategories(categoriesId, token);
          if (res.status === 200) {
            alert('Delete product type successfully');
            setCategories((prev) =>
              prev.filter((item) => item.id !== categoriesId)
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
    <div>
      <div className="flex justify-between py-3">
        <BackHeader title="Categories"></BackHeader>
        <img
          className="size-12 absolute right-2 top-2 cursor-pointer"
          src={Add}
          alt="Add"
          onClick={() => navigate('/admin/categories/create')}
        />
      </div>
      <div className="px-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-slate-300 rounded-xl flex items-center gap-4 p-3 mb-3 relative"
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/${category?.image}`}
              className="w-16 h-16 object-cover rounded-md"
              alt={category.name}
            />
            <div className="flex-1">
              <p className="font-bold">{category.name}</p>
              <p className="text-sm text-gray-500">
                Created:{' '}
                {dayjs(category.createdDate || 'N/A').format(
                  'HH:mm - DD/MM/YYYY'
                )}
              </p>
              <p className="text-sm text-gray-500">
                Updated:{' '}
                {dayjs(category.updateDate || 'N/A').format(
                  'HH:mm - DD/MM/YYYY'
                )}
              </p>
            </div>
            <div className="flex pt-10">
              <EditIcon
                onClick={() => handleClickOpen(category)}
                className="cursor-pointer text-blue-300 hover:text-blue-500"
                style={{ fontSize: '1.5rem' }}
              />
              <DeleteIcon
                className="cursor-pointer text-red-300 hover:text-red-500"
                onClick={() => handleDeleteCategories(category.id)}
              />
            </div>

            <p className="absolute top-3 right-3 text-sm text-gray-600">
              #{category.id}
            </p>
          </div>
        ))}
      </div>

      {currentCategory && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="ID"
              type="text"
              fullWidth
              value={currentCategory.id}
              disabled
            />
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={currentCategory.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Image"
              type="text"
              fullWidth
              value={currentCategory.image}
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

export default Categories;

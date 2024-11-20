import { useEffect, useState } from 'react';
import type { GetProp, UploadProps } from 'antd';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import BackHeader from '../../components/header/BackHeader';
import { useAppSelector } from '../../../src/redux/hook';
import { apiCategories, apiPostProduct } from '../../../src/api/product';
import { useNavigate } from 'react-router-dom';
import { RcFile } from 'antd/es/upload';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

type FormValueProps = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productSize: string;
  imageFile: any;
  productCategory: number | undefined;
};

interface Category {
  id: number;
  name: string;
  image: string;
  imageFile: any;
  createdDate: string | null;
  updateDate: string | null;
}

function CreateProduct() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useAppSelector((state) => state.authState);
  // const [imageUrl, setImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<string>('');

  // const beforeUpload = (file: FileType) => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     alert('You can only upload JPG/PNG file!');
  //   }

  //   return isJpgOrPng;
  // };

  // const handleChange: UploadProps['onChange'] = (info) => {
  //   if (info.file.status === 'uploading') {
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     getBase64(info.file.originFileObj as FileType, (url) => {
  //       setImageUrl(url);
  //     });
  //   }
  // };

  // const getFile = (e: any) => {
  //   console.log('Upload event:', e);

  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e.file.originFileObj;
  //   // return e && e.fileList.originFileObj;
  // };

  const handleSubmit = async (values: FormValueProps) => {
    console.log(values);

    const dataRes = await apiPostProduct(
      {
        name: values.productName,
        description: values.productDescription,
        price: values.productPrice,
        size: values.productSize,
        imageFile: values.imageFile.file,
        categoryId: values.productCategory
      },
      token
    );
    if (dataRes) {
      alert('Thanh cong');
      console.log('data', dataRes);
    }
  };

  useEffect(() => {
    (async () => {
      const dataRes = await apiCategories();
      if (dataRes) {
        setCategories(dataRes.items);
      }
    })();
  }, []);

  // const uploadButton = (
  //   <button style={{ border: 0, background: 'none' }} type="button">
  //     <PlusOutlined />
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </button>
  // );
  const handleFileChange = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(reader.result as string); // Lưu chuỗi base64 của hình ảnh
    };
    reader.readAsDataURL(file); // Chuyển file thành base64
    return false; // Ngừng hành động tải lên mặc định
  };

  return (
    <div className="px-5 py-3">
      <BackHeader title="Add product" />

      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => handleSubmit(values)}
        initialValues={{
          productSize: 'M'
        }}
      >
        <Form.Item name={'productName'} label="Product name" required>
          <Input placeholder="Enter the product name" />
        </Form.Item>
        <Form.Item name={'productDescription'} label="Description">
          <TextArea placeholder="Enter a description for the product" />
        </Form.Item>
        <Form.Item name={'productPrice'} label="Price" required>
          <InputNumber className="w-full" placeholder="Enter price" />
        </Form.Item>
        <Form.Item name={'productSize'} label="Size" required>
          <Select
            placeholder="Select the size of the product"
            options={[
              { value: 'S', label: 'S' },
              { value: 'M', label: 'M' },
              { value: 'L', label: 'L' }
            ]}
          />
        </Form.Item>
        <Form.Item name={'productCategory'} label="Category">
          <Select
            placeholder=" Enter Category"
            options={categories.map((category) => ({
              value: category.id,
              label: category.name
            }))}
          />
        </Form.Item>

        <Form.Item label="Image" name={'imageFile'}>
          <Upload
            name="file"
            accept="image/*"
            showUploadList={false}
            beforeUpload={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateProduct;

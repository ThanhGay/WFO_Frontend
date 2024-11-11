import { useState } from 'react';
import type { GetProp, UploadProps } from 'antd';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import BackHeader from '../../components/header/BackHeader';
import { useAppSelector } from '../../../src/redux/hook';
import { apiPostProduct } from '../../../src/api/product';

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
  productImage: File | undefined;
  productCategory: number | undefined;
};

function CreateProduct() {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const { token } = useAppSelector((state) => state.authState);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      alert('You can only upload JPG/PNG file!');
    }

    return isJpgOrPng;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setImageUrl(url);
      });
    }
  };

  const getFile = (e: any) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    return e.file.originFileObj;
    // return e && e.fileList.originFileObj;
  };

  const handleSubmit = async (values: FormValueProps) => {
    console.log('saved token:', token);

    const dataRes = await apiPostProduct(
      {
        name: values.productName,
        description: values.productDescription,
        price: values.productPrice,
        size: values.productSize,
        imageFile: values.productImage,
        categoryId: values.productCategory
      },
      token
    );

    if (dataRes) console.log(dataRes);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="px-5 py-3">
      <BackHeader title="Thêm mới sản phẩm" />

      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => handleSubmit(values)}
        initialValues={{
          productSize: 'M'
        }}
      >
        <Form.Item name={'productName'} label="Tên sản phẩm" required>
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>
        <Form.Item name={'productDescription'} label="Mô tả">
          <TextArea placeholder="Nhập mô tả cho sản phẩm" />
        </Form.Item>
        <Form.Item name={'productPrice'} label="Giá" required>
          <InputNumber className="w-full" placeholder="Nhập giá bán" />
        </Form.Item>
        <Form.Item name={'productSize'} label="Kích cỡ" required>
          <Select
            placeholder="Chọn kích cỡ của sản phẩm"
            options={[
              { value: 'S', label: 'S' },
              { value: 'M', label: 'M' },
              { value: 'L', label: 'L' }
            ]}
          />
        </Form.Item>
        <Form.Item name={'productCategory'} label="Phân loại">
          <Select placeholder="Chọn phân loại sản phẩm" />
        </Form.Item>
        <Form.Item
          name={'productImage'}
          label="Ảnh hiển thị"
          getValueFromEvent={getFile}
        >
          <Upload
            showUploadList={false}
            listType="picture-card"
            maxCount={1}
            
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="image-ingredient"
                style={{ width: '100%' }}
              />
            ) : (
              uploadButton
            )}
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

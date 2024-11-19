import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { apiAddCategories } from '../../api/category';
import { useAppSelector } from '../../redux/hook';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload/interface';
import BackHeader from '../../components/header/BackHeader';

type FormValueProps = {
  name: string;
  imageFile: any;
};

function AddCategories() {
  const { token } = useAppSelector((state) => state.authState);
  const [imageFile, setImageFile] = useState<string>('');
  const [name, setName] = useState<string>('');
  const handleConfirm = async (values: FormValueProps) => {
    try {
      const response = await apiAddCategories(
        {
          name: values.name,
          imagefile: values.imageFile.file
        },
        token
      );
      message.success('Category added successfully!');
    } catch (error) {
      message.error('Failed to add category.');
    }
  };

  // Xử lý thay đổi file để xử lý hình ảnh
  const handleFileChange = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(reader.result as string); // Lưu chuỗi base64 của hình ảnh
    };
    reader.readAsDataURL(file); // Chuyển file thành base64
    return false; // Ngừng hành động tải lên mặc định
  };
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // Cập nhật giá trị state
  };
  return (
    <div className="py-3 px-3">
      <BackHeader title="Add Categories" />
      <Form
        onFinish={(values) => handleConfirm(values)}
        layout="vertical"
        initialValues={{ name: '', imageFile: '' }}
      >
        <Form.Item
          label="Name"
          name={'name'}
          rules={[
            { required: true, message: 'Please input the category name!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name={'imageFile'}
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
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
          <Button type="primary" htmlType="submit" style={{width:'100%'}}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddCategories;

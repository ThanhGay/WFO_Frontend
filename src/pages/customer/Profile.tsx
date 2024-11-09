import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Form, Input, message, Popover } from 'antd';
import { EllipsisOutlined, SwapOutlined } from '@ant-design/icons';
import moment from 'moment';

import { useAppSelector } from '../../redux/hook';
import BackHeader from '../../components/header/BackHeader';

function calcAge(birthDateStr: string) {
  const now = moment();
  const birthDate = moment(birthDateStr);
  return now.diff(birthDate, 'years');
}

function Profile() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.authState);
  const [editMode, setEditMode] = useState(false);
  const [messageAntd, contextHolder] = message.useMessage();

  const handleSwitch = () => {
    if (user?.type === 'Admin') {
      navigate('/admin');
    } else {
      messageAntd.error('Bạn không có quyền truy cập');
    }
  };

  const PopOverContent = () => {
    return (
      <div
        className="flex gap-1 items-center cursor-pointer"
        onClick={handleSwitch}
      >
        <SwapOutlined />
        <div>Switch to Admin</div>
      </div>
    );
  };

  return (
    <div className="px-5 py-3 relative">
      {contextHolder}
      <BackHeader title="Personal Information" />

      <div className="absolute top-4 right-4">
        <Popover content={<PopOverContent />} trigger={'click'}>
          <Button
            type="primary"
            shape="circle"
            icon={<EllipsisOutlined />}
            style={{ backgroundColor: '#ECF0F4', color: 'black' }}
          />
        </Popover>
      </div>

      <div className="flex gap-8 mb-8 items-center">
        <Avatar
          src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
          size={120}
          alt="avatar"
        />
        <div className="flex flex-col text-start gap-4">
          <p className="text-2xl font-semibold">{user?.lastName}</p>
          <p>{user?.description}</p>
        </div>
      </div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="inline"
        disabled={!editMode}
        onFinish={(values) => console.log(values)}
        style={{ backgroundColor: '#F0F5FA', padding: 16, borderRadius: 16 }}
      >
        <Form.Item name="username" label="Full name">
          <Input
            variant="borderless"
            placeholder="Fullname"
            defaultValue={user?.fullName ? user.fullName : 'Khách hàng'}
            style={{ color: 'black' }}
          />
        </Form.Item>
        <Form.Item name="sex" label="Sex">
          <Input
            variant="borderless"
            placeholder="Sex"
            defaultValue={'Trống'}
            style={{ color: 'black' }}
          />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <Input
            variant="borderless"
            placeholder="Age"
            defaultValue={calcAge(user?.dateOfBirth)}
            style={{ color: 'black' }}
          />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input
            variant="borderless"
            placeholder="Phone number"
            defaultValue={user?.phone ? user.phone : 'Chưa có'}
            style={{ color: 'black' }}
          />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input
            variant="borderless"
            placeholder="Address"
            defaultValue={user?.address ? user.address : 'Chưa có'}
            style={{ color: 'black' }}
          />
        </Form.Item>
      </Form>
      <div className="mt-[90px] w-full flex flex-col gap-4">
        <Button
          type="primary"
          style={{
            textTransform: 'capitalize',
            width: '100%',
            padding: 24,
            backgroundColor: '#FF7622'
          }}
          onClick={() => setEditMode(true)}
        >
          edit information
        </Button>
      </div>
    </div>
  );
}

export default Profile;

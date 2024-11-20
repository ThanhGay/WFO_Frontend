import { useNavigate } from 'react-router-dom';
import { Avatar, Button, message, Popover } from 'antd';
import {
  RightOutlined,
  EllipsisOutlined,
  SwapOutlined
} from '@ant-design/icons';

import { logout } from '../../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import BackHeader from '../../components/header/BackHeader';
import CustomBottomNavigation from '../../components/navigation/CustomBottomNavigation';
import {
  MapIcon,
  UserIcon,
  HeartIcon,
  LogoutIcon,
  NotificationIcon,
  PaymentCardIcon
} from '../../assets/icons';
import { getListCustomer, getListOrder, getReport } from '../../redux/features/adminSlice';

const RenderItem = ({
  title,
  icon,
  onClick
}: {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2" onClick={onClick}>
        <Button
          disabled
          shape="circle"
          size="large"
          style={{ backgroundColor: 'white' }}
          icon={icon}
        />
        <p>{title}</p>
      </div>
      <RightOutlined />
    </div>
  );
};

function MenuProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.authState);

  const [messageAntd, contextHolder] = message.useMessage();
  const handleSwitch = async () => {
    if (user?.type === 'Admin') {
      dispatch(getListCustomer());
      dispatch(getListOrder(token));
      dispatch(
        getReport({
          token: token,
          startDate: '2024-01-01',
          endDate: '2024-12-31'
        })
      );
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
      <BackHeader title="Menu Profile" />

      {/* Switch to Admin */}
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
      {/* Content */}
      <div className="pb-20">
        <div className="flex gap-8 mb-8 items-center">
          <Avatar
            src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
            size={100}
            alt="avatar"
          />
          <div className="flex flex-col text-start gap-4">
            <p className="text-2xl font-semibold">{user?.lastName}</p>
            <p>{user?.description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 bg-[#F0F5FA] py-4 px-5 rounded-xl">
            <RenderItem
              title="Personal Information"
              icon={<UserIcon />}
              onClick={() => navigate('information')}
            />
            <RenderItem title="Address" icon={<MapIcon />} />
          </div>
          <div className="flex flex-col gap-4 bg-[#F0F5FA] py-4 px-5 rounded-xl">
            <RenderItem
              title="Cart"
              icon={<UserIcon />}
              onClick={() => navigate('/cart')}
            />
            <RenderItem
              title="Favourite"
              icon={<HeartIcon />}
              onClick={() => navigate('/favourite')}
            />
            <RenderItem title="Notifications" icon={<NotificationIcon />} />
            <RenderItem title="Payment Method" icon={<PaymentCardIcon />} />
          </div>
          <div className="bg-[#F0F5FA] py-4 px-5 rounded-xl">
            <RenderItem
              title="Log Out"
              icon={<LogoutIcon />}
              onClick={() => {
                dispatch(logout());
                navigate('/');
              }}
            />
          </div>
        </div>
      </div>

      <CustomBottomNavigation screen="profile" />
    </div>
  );
}

export default MenuProfile;

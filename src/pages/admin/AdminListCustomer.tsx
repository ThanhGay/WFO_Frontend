import { useState } from 'react';
import { Button, Col, Collapse, CollapseProps, Modal, Row } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import Banned from '../../img/Banned.png';
import BackHeader from '../../components/header/BackHeader';

import { apiDeleteCustomer } from '../../api/user';
import { deleteCustomer } from '../../redux/features/adminSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';

function AdminListCustomer() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authState);
  const { data: listCustomer } = useAppSelector(
    (state) => state.adminState.listCustomer
  );

  const [openModal, setOpenModal] = useState(false);
  const [current, setCurrent] = useState(-1);

  const handleOpenModal = (customerId: number) => {
    setCurrent(customerId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrent(-1);
    setOpenModal(false);
  };

  const handleDelete = async (customerId: number) => {
    try {
      const dataRes = await apiDeleteCustomer(customerId, token);
      if (dataRes) {
        dispatch(deleteCustomer(customerId));
        handleCloseModal();
      }
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  const items: CollapseProps['items'] = listCustomer.map((user: any) => {
    return {
      key: user?.id.toString(),
      label: user?.firstName + ' ' + user?.lastName,
      children: (
        <div className="flex flex-col gap-4 relative">
          <Row gutter={[8, 16]}>
            <Col span={8} style={{ fontWeight: 600, color: 'darkgoldenrod' }}>
              First Name
            </Col>
            <Col span={16} style={{ color: 'InfoText' }}>
              {user?.firstName}
            </Col>
          </Row>
          <Row gutter={[8, 16]}>
            <Col span={8} style={{ fontWeight: 600, color: 'darkgoldenrod' }}>
              Last Name
            </Col>
            <Col span={16} style={{ color: 'InfoText' }}>
              {user?.lastName}
            </Col>
          </Row>
          <Row gutter={[8, 16]}>
            <Col span={8} style={{ fontWeight: 600, color: 'darkgoldenrod' }}>
              Sex
            </Col>
            <Col span={16} style={{ color: 'InfoText' }}>
              {user?.sex}
            </Col>
          </Row>
          <Row gutter={[8, 16]}>
            <Col span={8} style={{ fontWeight: 600, color: 'darkgoldenrod' }}>
              Date of birth
            </Col>
            <Col span={16} style={{ color: 'InfoText' }}>
              {dayjs(user?.dateOfBirth).format('DD/MM/YYYY')}
            </Col>
          </Row>
          <Row gutter={[8, 16]}>
            <Col span={8} style={{ fontWeight: 600, color: 'darkgoldenrod' }}>
              Email
            </Col>
            <Col span={16} style={{ color: 'InfoText' }}>
              {user?.email}
            </Col>
          </Row>
          <Row gutter={[8, 16]}>
            <Col span={8} style={{ fontWeight: 600, color: 'darkgoldenrod' }}>
              Phone number
            </Col>
            <Col span={16} style={{ color: 'InfoText' }}>
              {user?.phone}
            </Col>
          </Row>
          <Row gutter={[8, 16]}>
            <Col span={8} style={{ fontWeight: 600, color: 'darkgoldenrod' }}>
              Address
            </Col>
            <Col span={16} style={{ color: 'InfoText' }}>
              {user?.address}
            </Col>
          </Row>
          {user?.isBanned ? (
            <img
              alt="banned"
              src={Banned}
              className="absolute bottom-0 right-0 w-20 h-14 z-50"
            />
          ) : (
            <Button
              className="absolute bottom-0 right-0"
              style={{ backgroundColor: 'red' }}
              type="primary"
              icon={<StopOutlined />}
              onClick={() => handleOpenModal(user?.id)}
            />
          )}
        </div>
      )
    };
  });
  return (
    <div className="px-5 py-3">
      <BackHeader title="Customers" />
      <Collapse accordion items={items} />
      <Modal
        title="Ban account permanantly"
        open={openModal}
        okText="Confirm"
        cancelText="Cancel"
        onCancel={handleCloseModal}
        onOk={() => handleDelete(current)}
      >
        Do you want to delete this account?
      </Modal>
    </div>
  );
}

export default AdminListCustomer;

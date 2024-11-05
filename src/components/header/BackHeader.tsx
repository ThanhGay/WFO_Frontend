import { EllipsisOutlined, LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  title: string;
  haveMore?: boolean;
  onClickMore?: () => void;
}
function BackHeader({ title, haveMore, onClickMore }: BackHeaderProps) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {haveMore ? (
        <div className="flex items-center justify-between w-full mb-7 ">
          <div className="left-container flex justify-center items-center gap-4 size-4">
            <Button
              type="primary"
              shape="circle"
              icon={<LeftOutlined />}
              style={{ backgroundColor: '#ECF0F4', color: 'black' }}
              onClick={goBack}
            />
            <p>{title}</p>
          </div>
          <div className="btn-more-container">
            <Button
              type="primary"
              shape="circle"
              icon={<EllipsisOutlined />}
              style={{ backgroundColor: '#ECF0F4', color: 'black' }}
              onClick={onClickMore}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full gap-4 mb-7">
          <Button
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            style={{
              width: 45,
              height: 45,
              backgroundColor: '#ECF0F4',
              color: 'black'
            }}
            onClick={goBack}
          />
          <p>{title}</p>
        </div>
      )}
    </>
  );
}

export default BackHeader;

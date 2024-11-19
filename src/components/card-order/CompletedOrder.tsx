import { Button } from 'antd';
import MealBox from '../../img/MealBox.png';
import dayjs from 'dayjs';

function CompletedOrderCard({ data }: { data: any }) {
  const statusText = (status: number) => {
    switch (status) {
      case 5:
        return { text: 'Done', bgColor: '#8BC34A' };
      case 10:
        return { text: 'Canceled', bgColor: 'red' };
      default:
        return { text: 'Unknown', bgColor: '#9E9E9E' };
    }
  };

  const handleTrackOrder = async (id: string) => {
    console.log(id);
  };
  return (
    <div className="my-2 shadow-lg border rounded-2xl">
      <p
        className="text-sm font-medium p-2 rounded-t-2xl text-white"
        style={{ backgroundColor: statusText(data.status).bgColor }}
      >
        {statusText(data.status).text}
      </p>
      <div className="bg-slate-50 rounded-b-2xl  p-3 relative">
        <div className="top-4 right-4 absolute text-xs underline text-[#6B6E82]">
          #{data.id}
        </div>
        <div className="flex items-center gap-4">
          <img src={MealBox} alt="MealBox" className="w-16 h-16 rounded-md" />
          <div>
            <p className="text-base font-medium">Nhà hàng 3 chúng mình</p>
            <div className="flex gap-2 items-center text-sm text-gray-500">
              <p className="line-clamp-1 ">
                {dayjs(data.shippedDate || data.canceledDate).format(
                  'DD MMM - HH:mm'
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button
            className="w-full font-medium"
            size="large"
            style={{
              backgroundColor: 'white',
              color: '#FF7622',
              border: 'solid 1px #FF7622'
            }}
            onClick={() => handleTrackOrder(data.id)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompletedOrderCard;

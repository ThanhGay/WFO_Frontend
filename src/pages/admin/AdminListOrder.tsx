import { ConfigProvider, Tabs } from 'antd';

import { useAppSelector } from '../../redux/hook';

import BackHeader from '../../components/header/BackHeader';
import { CompletedCard, ProcessingCard } from '../../components/card-order';

function AdminListOrder() {
  const { data: listOrder } = useAppSelector(
    (state) => state.adminState.listOrder
  );

  const listCompleted = listOrder.filter(
    (item: any) => item.status === 10 || item.status === 5
  );
  

  return (
    <div className="px-5 py-3">
      <BackHeader title="Orders" />
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemActiveColor: '#FF7622',
              inkBarColor: '#FF7622',
              itemSelectedColor: '#FF7622',
              itemHoverColor: '#F6C000',
              itemColor: '#ddd',
              
            }
          }
        }}
      >
        <Tabs
          defaultActiveKey="1"
          size="large"
          tabPosition="top"
          
          items={[
            {
              key: '1',
              label: 'New',
              children: (
                <div className="space-y-8">
                  {listOrder
                    .filter((item: any) => item.status === 0)
                    .map((item: any) => (
                      <ProcessingCard key={item.id} data={item} />
                    ))}
                </div>
              )
            },
            {
              key: '2',
              label: 'Cooking',
              children: (
                <div className="space-y-8">
                  {listOrder
                    .filter((item: any) => item.status === 1)
                    .map((item: any) => (
                      <ProcessingCard key={item.id} data={item} />
                    ))}
                </div>
              )
            },
            {
              key: '3',
              label: 'Ongoing',
              children: (
                <div className="space-y-8">
                  {listOrder
                    .filter((item: any) => item.status === 2)
                    .map((item: any) => (
                      <ProcessingCard key={item.id} data={item} />
                    ))}
                </div>
              )
            },
            {
              key: '4',
              label: 'Received',
              children: (
                <div className="space-y-8">
                  {listOrder
                    .filter((item: any) => item.status === 3)
                    .map((item: any) => (
                      <ProcessingCard key={item.id} data={item} />
                    ))}
                </div>
              )
            },
            {
              key: '5',
              label: 'Completed',
              children: (
                <div className="space-y-8">
                  {listCompleted.map((item: any) => (
                    <CompletedCard key={item.id} data={item} />
                  ))}
                </div>
              )
            }
          ]}
        />
      </ConfigProvider>
    </div>
  );
}

export default AdminListOrder;

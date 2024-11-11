import { ErrorCloud } from '../assets/icons';
import BackHeader from '../components/header/BackHeader';

const NoPage = () => {
  return (
    <div className="h-screen bg-white px-5 py-3">
      <BackHeader title="" />
      <div className="flex flex-col justify-center items-center">
        <ErrorCloud />
        <div className="flex flex-col gap-2 justify-center items-center rounded-2xl bg-[#F0F5FA] h-64 font-semibold text-lg p-4">
          <div>Comming soon!</div>
          <div>Sorry, this function we're updating </div>
        </div>
      </div>
    </div>
  );
};

export default NoPage;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDataFromLocalStorage, KEY_STORAGE } from '../../local/config';
import { useAppDispatch } from '../../redux/hook';
import { setDataUser, setToken } from '../../redux/features/authSlice';

const Layout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const data = await getDataFromLocalStorage(KEY_STORAGE.USER);
      const tokenSaved = await getDataFromLocalStorage(KEY_STORAGE.TOKEN);

      if (data && tokenSaved) {
        dispatch(setDataUser(data));
        dispatch(setToken(tokenSaved));
      }
    })();
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center flex-col p-3 min-h-screen">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTumDXAeg3eNqyEVgnHuHRtQV084geYmBQINg&s"
        alt="logo"
        width={260}
        height={260}
        className="rounded-full"
      />
      <div className="flex flex-col gap-5 items-center justify-center text-center">
        <div className="text-2xl font-bold">Welcome to our service</div>
        <div className="font-medium text-[#646982]">
          Get all your loved foods in one once place, you just place the order
          we do the rest
        </div>
      </div>
      <div
        id="buttons"
        className="flex flex-col gap-5 items-center justify-center mt-5 font-bold"
      >
        <Link to="/login">
          <button className="py-5 px-[128px] bg-[#FFCA28] border-[1px] border-[#FFCA28] rounded-lg text-white">
            Log in
          </button>
        </Link>
        <Link to="/signup">
          <button className="py-5 px-[124px] border-[1px] rounded-lg border-[#FF7622] text-[#FF7622]">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Layout;

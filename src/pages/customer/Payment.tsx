import BackHeader from "../../components/header/BackHeader";
import back_right from "../../img/back_right.png"
import Chicken from '../../img/Heading Image.png';

function Payment() {
    return (
        <div className="pt-3 pl-3">
            <BackHeader title="Payment"></BackHeader>
            <div className="bg-slate-300 rounded-lg flex justify-between items-center">
                <div>
                    <p className="pl-3 font-semibold">DELIVERY ADDRESS</p>
                    <p className="pl-3 font-thin py-3 ">112 le thanh nghi ha noi</p>
                </div>
                <img className="size-8" src={back_right} />
            </div>
            <div className="bg-slate-300 rounded-lg flex items-center justify-between mt-2 ">
                <p className="py-2 px-2">Payment method</p>
                <img className="size-8" src={back_right} />
            </div>
            <div className="py-5 flex gap-2 items-center">
                <img className="h-20 rounded-xl" src={Chicken}/>
                <div>
                    <p className="text-lg font-medium">Pizza name fice</p>
                    <p className="text-sm text-slate-400 line-clamp-1">Discreption sgfgfdshdhdhdhdfhshdh</p>
                    <p className="text-lg font-medium">Gia tien</p>
                </div>
                <p className="pl-14 font-bold">x3</p>
            </div>
        </div>
    );
}

export default Payment;
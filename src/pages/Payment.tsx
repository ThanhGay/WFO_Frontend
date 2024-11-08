import BackHeader from "../components/header/BackHeader";

function Payment() {
    return ( 
        <div className="pt-3 pl-3">
            <BackHeader title="Payment"></BackHeader>
            <div className="bg-slate-300 rounded-lg">
                <p className="pl-3 font-semibold">DELIVERY ADDRESS</p>
                <p className="pl-3 font-thin py-3 ">112 le thanh nghi ha noi</p>
            </div>
        </div>
     );
}

export default Payment;
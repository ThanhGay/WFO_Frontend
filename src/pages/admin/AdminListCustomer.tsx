import { useEffect } from "react";
import BackHeader from "../../components/header/BackHeader";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getListCustomer } from "../../redux/features/adminSlice";

function AdminListCustomer() {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector((state) => state.authState)
    const {data: listCustomer} = useAppSelector((state) => state.adminState.listCustomer)

    console.log(listCustomer);
    
    return <div className="px-5 py-3">
        
        <BackHeader title="Customers" />

        
        </div>;
}

export default AdminListCustomer;
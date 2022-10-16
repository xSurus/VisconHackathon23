import { useRouter } from "next/router";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";

const Reedem = () => {
	const router = useRouter();
	const { uuid } = router.query;

	const [voucherState, setVoucherState] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        axios.get("/api/voucher", { params: { id: uuid} })
        .then((res) => {setVoucherState(true); setName(res.data[0].name)})
        .catch((res) => {setVoucherState(false); setName("")})
    }, [])

	return <><h1>Reedem voucher</h1><h3>{voucherState ? "Voucher accepted! :)" : "Voucher rejected! :("}</h3><div>{voucherState ? <CheckCircleIcon/>: <CancelIcon/>}</div><div>Activity: {name}<br/>UUID: {uuid}</div></>
};

export default Reedem;
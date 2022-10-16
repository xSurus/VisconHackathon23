import { useRouter } from "next/router";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";

const Reedem = () => {
	const router = useRouter();
	const { uuid } = router.query;

	return <><h1>Reedem voucher</h1><h3>Voucher accepted!</h3><div><CheckCircleIcon/></div><div>Activity: Free Booze<br/>UUID: ce6def9e-36cb-421b-bde4-25d503bbbfea</div></>
};

export default Reedem;
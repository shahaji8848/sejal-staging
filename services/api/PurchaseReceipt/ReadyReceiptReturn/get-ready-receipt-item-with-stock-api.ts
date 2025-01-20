import { CONSTANTS } from "@/services/config/api-config";
import { callGetAPI } from "../../utils";


const getRRStockItemApi = async (get_access_token: any) => {
    let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=rr_item_name_stock&entity=purchase_receipt_return`;
    const response = await callGetAPI(url, get_access_token);
    return response;
};

export default getRRStockItemApi;

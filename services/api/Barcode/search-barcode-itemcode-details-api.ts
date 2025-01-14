import { CONSTANTS } from '../../config/api-config';
import { callGetAPI } from '../utils';

const getSearchBarcodeItemCodeDetails: any = async (
  request: any,
  karigar_name: any,
  get_access_token: any
) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_item_wise_barcode_filter&entity=barcode&posting_date=${request.date}&custom_karigar=${karigar_name}&name=${request.item_group}&sr_from=${request.sr_no_from}&sr_to=${request.sr_no_to}&stock=${request.stock}`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getSearchBarcodeItemCodeDetails;

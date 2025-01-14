import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { get_client_group_data } from '@/store/slices/Master/get-client-group-slice';
import { get_sales_group_data } from '@/store/slices/Master/get-sales-group-slice';
import { useSelector } from 'react-redux';
import CategorySelection from './CategorySelection';
import MaterialTable from './MaterialTable';

const AddMasterRecordForm = ({ handleInputChange, inputValue, handleMaterialChange, materialValue, handleSaveBtn }: any) => {
    let clientGroupList = useSelector(get_client_group_data).data;
    let salesGroupDataFromStore = useSelector(get_sales_group_data).data;

    const productCodeData: any = {
        fieldname: 'client_group',
        fieldtype: 'Link',
        link_data:
            clientGroupList?.length > 0
                ? Array.from(new Set(clientGroupList.map((data: any) => data?.client_group)))
                : [],
    };
    const salesGroupData: any = {
        fieldname: 'sales_group',
        fieldtype: 'Link',
        link_data:
            salesGroupDataFromStore?.length > 0
                ? Array.from(new Set(salesGroupDataFromStore.map((data: any) => data?.sales_group)))
                : [],
    };
    return (
        <>
            <div className='row'>
                <div className="col-lg-6">
                    <label htmlFor="">Client<span className='text-danger'>*</span></label>
                    <input
                        type="text"
                        className="form-control border p-0 px-2"
                        name="client_name"
                        value={inputValue?.client_name}
                        onChange={(e) => {
                            handleInputChange(e.target.value, e.target.name);
                        }}
                        required
                        autoComplete="off"
                    />
                    <label htmlFor="">Client Group<span className='text-danger'>*</span></label>
                    <AutoCompleteInput
                        data={productCodeData}
                        handleSearchInput={(value: any, fieldName: any) =>
                            handleInputChange(value, fieldName)
                        }
                        value={inputValue?.client_group}
                        styleCss={{
                            padding: "0px"
                        }}
                    />
                    <label htmlFor="">Sales Group<span className='text-danger'>*</span></label>
                    <AutoCompleteInput
                        data={salesGroupData}
                        handleSearchInput={(value: any, fieldName: any) =>
                            handleInputChange(value, fieldName)
                        }
                        value={inputValue?.sales_group}
                        styleCss={{
                            padding: "0px"
                        }}
                    />

                    <div className="">
                        <CategorySelection handleNameChange={handleInputChange} inputValue={inputValue} />
                        <button type="button" className="btn btn-outline-primary btn-sm mt-4 px-3" onClick={handleSaveBtn}>Save</button>
                    </div>
                </div>
                <div className="col-lg-6">
                    <MaterialTable handleMaterialChange={handleMaterialChange} materialValue={materialValue} />
                </div>

            </div>
        </>
    )
}

export default AddMasterRecordForm
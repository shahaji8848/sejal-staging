import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { get_material_group_data } from '@/store/slices/Master/get-material-group-slice';
import { useSelector } from 'react-redux';
import MaterialTable from '../Common/MaterialTable';

const AddKundanKarigarRecordForm = ({ handleInputChange, inputValue, handleSaveBtn, handleMaterialChange, materialValue }: any) => {

    let materialGroupDataFromStore: any = useSelector(get_material_group_data)?.data;

    const clientGroupData: any = {
        fieldname: 'material_group',
        fieldtype: 'Link',
        link_data:
            materialGroupDataFromStore?.length > 0
                ? Array.from(new Set(materialGroupDataFromStore.map((data: any) => data?.material_group)))
                : [],
    };

    return (
        <>
            <div className='row'>
                <div className="col-lg-6 mt-1">
                    <label htmlFor="">Kundan Karigar Name<span className='text-danger'>*</span></label>
                    <input
                        type="text"
                        className="form-control border p-0 px-2"
                        name="karigar_name"
                        value={inputValue?.karigar_name || ""}
                        onChange={(e) => {
                            handleInputChange(e.target.value, e.target.name);
                        }}
                        required
                        autoComplete="off"

                    />
                    <div className="mt-2">
                        <label htmlFor="">Kundan Karigar Code<span className='text-danger'>*</span></label>
                        <input
                            type="text"
                            className="form-control border p-0 px-2"
                            name="karigar_code"
                            value={inputValue?.karigar_code || ""}
                            onChange={(e) => {
                                handleInputChange(e.target.value, e.target.name);
                            }}
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="">Material Group<span className='text-danger'>*</span></label>
                        <AutoCompleteInput
                            data={clientGroupData}
                            handleSearchInput={(value: any, fieldName: any) =>
                                handleInputChange(value, fieldName)

                            }
                            value={inputValue?.material_group || ""}
                            styleCss={{
                                padding: "0px"
                            }}
                        />
                    </div>

                    <button type="button" className="btn btn-outline-primary btn-sm mt-3 px-3" onClick={handleSaveBtn}>Save</button>

                </div>
                <div className="col-lg-6">
                    <MaterialTable handleMaterialChange={handleMaterialChange} inputValue={inputValue} materialValue={materialValue} isReadOnly={false} />
                </div>

            </div>
        </>
    )
}

export default AddKundanKarigarRecordForm;
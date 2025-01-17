import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { get_material_group_data } from '@/store/slices/Master/get-material-group-slice';
import React from 'react'
import { useSelector } from 'react-redux';

const AddFewRecordForm = ({ handleInputChange, inputValue, handleSaveBtn }: any) => {
    let materialGroupDataFromStore = useSelector(get_material_group_data).data;

    const materialGroupData: any = {
        fieldname: 'material_group',
        fieldtype: 'Link',
        link_data:
            materialGroupDataFromStore?.length > 0
                ? Array.from(new Set(materialGroupDataFromStore.map((data: any) => data?.material_group)))
                : [],
    };
    return (
        <div className='row'>
            <div className="col-lg-6 mt-1">
                <label htmlFor="">Few<span className='text-danger'>*</span></label>
                <input
                    type="text"
                    className="form-control border p-0 px-2"
                    name="few"
                    value={inputValue?.few || ""}
                    onChange={(e) => {
                        handleInputChange(e.target.value, e.target.name);
                    }}
                    required
                    autoComplete="off"

                />
                <label htmlFor="">Few Abbr<span className='text-danger'>*</span></label>
                <input
                    type="text"
                    className="form-control border p-0 px-2"
                    name="few_abbr"
                    value={inputValue?.few_abbr || ""}
                    onChange={(e) => {
                        handleInputChange(e.target.value, e.target.name);
                    }}
                    required
                    autoComplete="off"
                />

                <label htmlFor="">Material Group<span className='text-danger'>*</span></label>
                <AutoCompleteInput
                    data={materialGroupData}
                    handleSearchInput={(value: any, fieldName: any) =>
                        handleInputChange(value, fieldName)
                    }
                    value={inputValue?.material_group || ""}
                    styleCss={{
                        padding: "0px"
                    }}
                />

                <button type="button" className="btn btn-outline-primary btn-sm mt-3 px-3" onClick={handleSaveBtn}>Save</button>
            </div>
        </div>
    )
}

export default AddFewRecordForm
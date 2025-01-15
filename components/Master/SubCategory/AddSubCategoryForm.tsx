import React from 'react';
import { useSelector } from 'react-redux';
import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { get_category_data } from '@/store/slices/Master/get-category-slice';

const AddSubCategoryForm = ({ handleInputChange, inputValue, handleSaveBtn, handleMaterialChange, materialValue }: any) => {
    let categoryDataFromStore: any = useSelector(get_category_data)?.data;

    const categoryData: any = {
        fieldname: 'category',
        fieldtype: 'Link',
        link_data:
            categoryDataFromStore?.length > 0
                ? Array.from(new Set(categoryDataFromStore.map((data: any) => data?.category)))
                : [],
    };
    return (
        <div className='row'>
            <div className="col-lg-6 mt-1">
                <label htmlFor="">Code<span className='text-danger'>*</span></label>
                <input
                    type="text"
                    className="form-control border p-0 px-2"
                    name="code"
                    value={inputValue?.code || ""}
                    onChange={(e) => {
                        handleInputChange(e.target.value, e.target.name);
                    }}
                    autoComplete="off"
                />
                <div className="mt-2">

                    <label htmlFor="">Sub Category<span className='text-danger'>*</span></label>
                    <input
                        type="text"
                        className="form-control border p-0 px-2"
                        name="sub_category"
                        value={inputValue?.sub_category || ""}
                        onChange={(e) => {
                            handleInputChange(e.target.value, e.target.name);
                        }}
                        autoComplete="off"
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor=""> Category<span className='text-danger'>*</span></label>
                    <AutoCompleteInput
                        data={categoryData}
                        handleSearchInput={(value: any, fieldName: any) =>
                            handleInputChange(value, fieldName)

                        }
                        value={inputValue?.category || ""}
                        styleCss={{
                            padding: "0px"
                        }}
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="">Counter</label>
                    <input
                        type="text"
                        className="form-control border p-0 px-2"
                        name="counter"
                        value={inputValue?.counter || ""}
                        onChange={(e) => {
                            handleInputChange(e.target.value, e.target.name);
                        }}
                        readOnly
                        autoComplete="off"
                    />
                </div>
                <button type="button" className="btn btn-outline-primary btn-sm mt-3 px-3" onClick={handleSaveBtn}>Save</button>
            </div>
        </div>
    )
}

export default AddSubCategoryForm
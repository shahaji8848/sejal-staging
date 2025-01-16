import React from 'react'

const AddCategoryRecordForm = ({ handleInputChange, inputValue, handleSaveBtn }: any) => {
    return (
        <div className='row'>
            <div className="col-lg-6 mt-1">
                <label htmlFor="">Category Name<span className='text-danger'>*</span></label>
                <input
                    type="text"
                    className="form-control border p-0 px-2"
                    name="category"
                    value={inputValue?.category || ""}
                    onChange={(e) => {
                        handleInputChange(e.target.value, e.target.name);
                    }}
                    required
                    autoComplete="off"

                />

                <button type="button" className="btn btn-outline-primary btn-sm mt-3 px-3" onClick={handleSaveBtn}>Save</button>
            </div>
        </div>
    )
}

export default AddCategoryRecordForm
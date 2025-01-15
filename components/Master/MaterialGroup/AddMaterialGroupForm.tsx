import React from 'react'

const AddMaterialGroupForm = ({ inputValue, handleInputChange, handleSaveBtn }: any) => {
    console.log({ inputValue })
    return (
        <div className='row'>
            <div className="col-lg-6 mt-1">
                <label htmlFor="">Material Group<span className='text-danger'>*</span></label>
                <input
                    type="text"
                    className="form-control border p-0 px-2"
                    name="material_group"
                    value={inputValue?.material_group || ""}
                    onChange={(e) => {
                        handleInputChange(e.target.value, e.target.name);
                    }}
                    autoComplete="off"
                />
                <button type="button" className="btn btn-outline-primary btn-sm mt-3 px-3" onClick={handleSaveBtn}>Save</button>
            </div>
        </div>
    )
}

export default AddMaterialGroupForm
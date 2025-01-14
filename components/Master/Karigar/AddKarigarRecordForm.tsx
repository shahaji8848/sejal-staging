import React from 'react'
import MaterialTable from '../Client/MaterialTable';

const AddKarigarRecordForm = ({ handleInputChange, inputValue, handleSaveBtn }: any) => {
    return (
        <>
            <div className='row'>
                <div className="col-lg-6 mt-1">
                    <label htmlFor="">Karigar Name<span className='text-danger'>*</span></label>
                    <input
                        type="text"
                        className="form-control border p-0 px-2"
                        name="karigar_name"
                        value={inputValue?.karigar_name}
                        onChange={(e) => {
                            handleInputChange(e.target.value, e.target.name);
                        }}
                        required
                        autoComplete="off"

                    />
                    <div className="mt-2">

                        <label htmlFor="">Karigar Code<span className='text-danger'>*</span></label>
                        <input
                            type="text"
                            className="form-control border p-0 px-2"
                            name="karigar_code"
                            value={inputValue?.karigar_code}
                            onChange={(e) => {
                                handleInputChange(e.target.value, e.target.name);
                            }}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <button type="button" className="btn btn-outline-primary btn-sm mt-3 px-3" onClick={handleSaveBtn}>Save</button>

                </div>
                {/* <div className="col-lg-6">
                    <MaterialTable handleMaterialChange={handleMaterialChange} materialValue={materialValue} isReadOnly={false} />
                </div> */}

            </div>
        </>
    )
}

export default AddKarigarRecordForm
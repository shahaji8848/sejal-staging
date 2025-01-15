import React from 'react'
import { useSelector } from 'react-redux';
import { get_material_data } from '@/store/slices/Master/get-material-slice';

const MaterialTable = ({ handleMaterialChange, inputValue, materialValue, isReadOnly = false }: any) => {
    let materialListDataFromStore = useSelector(get_material_data)?.data;
    let updatedMaterialData: any = inputValue?.material_group ? materialListDataFromStore?.length > 0 && materialListDataFromStore.filter((materialData: any) => inputValue?.material_group === materialData?.material_group) : materialListDataFromStore
    return (
        <>
            {updatedMaterialData?.length > 0 && (
                <div className="" style={{ height: "300px", overflowY: "scroll", position: 'relative' }}>

                    <table className="table table-bordered mt-2">
                        <thead className='sticky-header'>
                            <tr>
                                <th scope="col">Sr No.</th>
                                <th scope="col">Material</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {updatedMaterialData && updatedMaterialData?.length > 0 && updatedMaterialData.map((materialData: any, index: any) => {
                                return (<tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td scope="row" >{materialData?.material}</td>
                                    <td scope="row">
                                        <input
                                            type="number"
                                            className="form-control border p-0 px-2"
                                            name="price"
                                            value={materialValue[index]?.price || ""}
                                            onChange={(e: any) => {
                                                handleMaterialChange(e?.target?.value, materialData?.material, materialData?.material_group, index);
                                            }}
                                            autoComplete="off"
                                            readOnly={isReadOnly}
                                        />
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default MaterialTable
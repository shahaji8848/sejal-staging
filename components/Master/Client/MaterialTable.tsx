import React from 'react'
import { useSelector } from 'react-redux';
import { get_material_data } from '@/store/slices/Master/get-material-slice';

const MaterialTable = ({ handleMaterialChange, materialValue }: any) => {
    let materialListDataFromStore = useSelector(get_material_data)?.data;

    return (
        <>
            <div className="" style={{ height: "300px", overflowY: "scroll" }}>

                <table className="table table-bordered mt-2">
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Material</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>

                    <tbody>

                        {materialListDataFromStore && materialListDataFromStore?.length > 0 && materialListDataFromStore.map((materialData: any, index: any) => {
                            return (<tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td scope="row" >{materialData?.material}</td>
                                <td scope="row">
                                    <input
                                        type="number"
                                        className="form-control border p-0 px-2"
                                        name="price"
                                        value={materialValue[index]?.price || ""}
                                        onChange={(e) => {
                                            handleMaterialChange(e.target.value, materialData?.material, materialData?.material_group, index);
                                        }}
                                        required
                                        autoComplete="off"
                                    />
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MaterialTable
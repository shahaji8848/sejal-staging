import React from 'react'
import { Modal } from 'react-bootstrap';
import styles from '../../../../styles/readyReceipts.module.css';
import SelectInputMaterial from '@/components/InputDropdown/SelectInputMaterial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { get_kun_category_data } from '@/store/slices/Master/get-kun-category-slice';
import { useSelector } from 'react-redux';
import { get_few_data } from '@/store/slices/Master/get-few-slice';
import { get_kun_karigar_name_data } from '@/store/slices/Master/kun-karigar-name-slice';
import { get_karigar_name_data } from '@/store/slices/Master/karigar-name-slice';



const ReadyReceiptFewModal = ({ handleModalFieldChange,
    handleAddRow,
    fewWeight,
    setFewWeight,
    materialListData,
    calculateRowValue,
    handleDeleteChildTableRow,
    readOnlyFields,
    handleTabPressOnModal }: any) => {
    const kundanKarigarDataFromStore: any = useSelector(get_karigar_name_data)?.data;
    const fewDataFromStore: any = useSelector(get_few_data)?.data;

    const fewData: any = {
        fieldname: 'few',
        fieldtype: 'Link',
        link_data:
            fewDataFromStore?.length > 0
                ? Array.from(new Set(fewDataFromStore.map((data: any) => data?.few)))
                : [],
    };
    const karigarCodeData: any = {
        fieldname: 'kundan_karigar',
        fieldtype: 'Link',
        link_data:
            kundanKarigarDataFromStore?.length > 0
                ? Array.from(new Set(kundanKarigarDataFromStore.map((data: any) => data?.karigar_code)))
                : [],
    };

    console.log({ fewWeight })

    return (
        <>
            <Modal.Body className="h-50">
                <div className="container d-flex justify-content-end">
                    <button
                        className="btn btn-link"
                        onClick={() => {
                            if (!readOnlyFields) {
                                handleAddRow('fewModalRow');
                            }
                        }}
                    >
                        Add Row
                    </button>
                </div>
                <div className="container-lg table-container ">
                    <div className=" modal-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th className="thead" scope="col">
                                        Sr. no
                                    </th>
                                    <th className="thead" scope="col">
                                        Few Abbr (Master)
                                    </th>
                                    <th className="thead" scope="col">
                                        Few (Master)
                                    </th>
                                    <th className="thead" scope="col">
                                        Kun karigar
                                    </th>
                                    <th className="thead" scope="col">
                                        Weight
                                    </th>
                                    <th className="thead" scope="col">
                                        Purity
                                    </th>
                                    <th className="thead" scope="col">
                                        New Weight
                                    </th>
                                    <th className="thead" scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {fewWeight?.length > 0 &&
                                    fewWeight?.map((element: any, i: any) => (
                                        <>
                                            <tr >
                                                <td className="table_row">{i + 1}</td>
                                                <td className="table_row">
                                                    <input
                                                        className={` ${styles.input_field} text-center`}
                                                        type="text"
                                                        value={element?.few_abbr}
                                                        readOnly={readOnlyFields}
                                                    />
                                                </td>
                                                <td className="table_row">
                                                    <AutoCompleteInput
                                                        data={fewData}
                                                        handleSearchInput={(value: any, fieldName: any) =>
                                                            handleModalFieldChange(i, 'fewModalRow', fieldName, value)
                                                        }
                                                        value={element?.few}
                                                        styleCss={{
                                                            padding: "0px",
                                                            border: "1px solid #6c757d",
                                                            // fontSize: "x-small",
                                                            lineHeight: "17px",
                                                            borderRadius: "0px",
                                                            textAlign: "center"
                                                        }}
                                                        // placeholder={"Select Karigar Code"}
                                                        readOnlyFields={readOnlyFields}
                                                    />

                                                </td>
                                                <td className="table_row">

                                                    <AutoCompleteInput
                                                        data={karigarCodeData}
                                                        handleSearchInput={(value: any, fieldName: any) =>
                                                            handleModalFieldChange(i, 'fewModalRow', fieldName, value)
                                                        }
                                                        value={element?.kundan_karigar}
                                                        styleCss={{
                                                            padding: "0px",
                                                            border: "1px solid #6c757d",
                                                            // fontSize: "x-small",
                                                            lineHeight: "17px",
                                                            borderRadius: "0px",
                                                            textAlign: "center"
                                                        }}
                                                        // placeholder={"Select Karigar Code"}
                                                        readOnlyFields={readOnlyFields}
                                                    />
                                                    {/* <input
                                                        className={` ${styles.input_field} text-end`}
                                                        type="number"
                                                        min={0}
                                                        value={element.pcs === '' ? 0 : element.pcs}
                                                        onChange={(e) =>
                                                            handleModalFieldChange(
                                                                i,
                                                                'modalRow',
                                                                'pcs',
                                                                e.target.value
                                                            )
                                                        }
                                                        readOnly={readOnlyFields}
                                                    /> */}
                                                </td>
                                                <td className="table_row">
                                                    <input
                                                        className={` ${styles.input_field} text-end`}
                                                        type="number"
                                                        min={0}
                                                        value={element.few_weight === "" ? "" : element.few_weight || 0}
                                                        onChange={(e) =>
                                                            handleModalFieldChange(
                                                                i,
                                                                'fewModalRow',
                                                                'few_weight',
                                                                e.target.value
                                                            )
                                                        }
                                                        // placeholder='0'
                                                        readOnly={readOnlyFields}
                                                    />
                                                </td>

                                                <td className="table_row">
                                                    <input
                                                        className={` ${styles.input_field} text-end`}
                                                        type="number"
                                                        min={0}
                                                        value={element.purity === '' ? 0 : element.purity}
                                                        onChange={(e) =>
                                                            handleModalFieldChange(
                                                                i,
                                                                'fewModalRow',
                                                                'purity',
                                                                e.target.value
                                                            )
                                                        }
                                                        readOnly={readOnlyFields}
                                                    />
                                                </td>

                                                <td className="table_row">
                                                    <input
                                                        className={`${styles.input_field} text-end`}
                                                        type="number"
                                                        min={0}
                                                        readOnly
                                                        disabled
                                                        onChange={(e) =>
                                                            handleModalFieldChange(
                                                                i,
                                                                'fewModalRow',
                                                                'new_weight',
                                                                e.target.value
                                                            )
                                                        }
                                                        value={element?.new_weight}
                                                    />
                                                </td>
                                                <td className="table_row">
                                                    <button
                                                        className="d-flex align-items-center delete-link p-1 border-0 w-25 "
                                                        onClick={() => handleDeleteChildTableRow(i, "few")}
                                                        onKeyDown={(e) =>
                                                            handleTabPressOnModal(e, "fewModalRow")
                                                        }
                                                        disabled={readOnlyFields}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="text-danger"

                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
        </>
    )
}

export default ReadyReceiptFewModal
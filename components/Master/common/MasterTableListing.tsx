import React, { useEffect, useState } from 'react';
import styled from '../../../styles/master.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import LoadMoreTableDataInMaster from '../LoadMoreTableDataInMaster';
import DeleteModal from '@/components/DeleteModal';
import { useDeleteModal } from '@/hooks/DeleteModal/delete-modal-hook';
import MasterFilters from './MasterFilters'; // Import the Filters component
import NoRecord from '@/components/General/NoRecord';

const MasterTableListing = ({ tableData, handleDeleteBtn, handleUpdateBtn }: any) => {
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [tableViewData, setTableViewData] = useState(20);

    const { showDeleteModal, setShowDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, deleteRecord } =
        useDeleteModal();

    useEffect(() => {
        if (tableData?.length > 0) {
            setFilteredData(tableData);
        }
    }, [tableData]);

    if (!tableData || tableData?.length === 0) {
        return <p>No data available</p>;
    }

    // Exclude 'materials' from headers
    const headers = Object?.keys(tableData[0]).filter((key) => key !== 'delete' && key !== 'materials');

    const formatHeader = (header: any) =>
        header
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char: any) => char?.toUpperCase());

    const handleFiltersChange = (updatedFilters: any) => {
        setFilters(updatedFilters);

        // Filter the table data based on filters
        const newFilteredData = tableData.filter((item: any) => {
            return Object.keys(updatedFilters).every((key) => {
                const filterValue = updatedFilters[key];
                return filterValue
                    ? item[key]?.toString()?.toLowerCase()?.includes(filterValue?.toLowerCase())
                    : true;
            });
        });

        setFilteredData(newFilteredData);
    };

    return (
        <>
            <MasterFilters
                headers={headers}
                filters={filters}
                onFiltersChange={handleFiltersChange}
            />

            <div className="d-flex align-items-end justify-content-end">
                {filteredData?.length > 0 && (
                    <div className="text-end pe-3 text-gray small m-0">
                        {filteredData?.slice(0, tableViewData)?.length} of{' '}
                        {filteredData?.length < 10
                            ? '0' + filteredData?.length
                            : filteredData?.length}
                    </div>
                )}
            </div>
            {filteredData?.length > 0 ? (
                <div className="table-responsive mt-2 px-3" style={{ borderStyle: 'none' }}>
                    <table className="table table-hover table-striped w-100" style={{ borderStyle: 'none' }}>
                        <thead style={{ borderStyle: 'none' }}>
                            <tr className="table_row" style={{ borderStyle: 'none' }}>
                                <th className="thead text-start">SR NO.</th>
                                {headers?.map((header) => (
                                    <th key={header} className="thead text-start">
                                        {formatHeader(header)}
                                    </th>
                                ))}
                                <th className="thead text-start"></th>
                            </tr>
                        </thead>
                        <tbody className="" style={{ borderStyle: 'none' }}>
                            {filteredData?.slice(0, tableViewData).map((item: any, rowIndex: any) => (
                                <tr key={rowIndex} style={{ borderStyle: 'none' }}>
                                    <td className="table-body-row cursor text-center" style={{ borderStyle: 'none' }}>
                                        {rowIndex + 1}
                                    </td>
                                    {headers.map((header) => (
                                        <td key={header} className="table-body-row cursor text-center" style={{ borderStyle: 'none' }}>
                                            {item[header]}
                                        </td>
                                    ))}

                                    <div className="d-flex justify-content-around py-1">

                                        <button
                                            className={`btn btn-link p-0 ${styled.actions_btn}`}
                                            onClick={() => handleUpdateBtn(item)}
                                        >
                                            Update
                                        </button>
                                        <div className="d-flex justify-space-between w-50">
                                            <button
                                                className={`btn btn-link text-danger p-0 ${styled.actions_btn}`}
                                                onClick={() => handleShowDeleteModal(item?.client_name)}
                                                disabled={item?.delete === 0 ? true : false}
                                            >
                                                Delete
                                            </button>
                                            <div className="">
                                                {item?.delete === 0 && (
                                                    <OverlayTrigger
                                                        trigger={['hover', 'click']}
                                                        rootClose
                                                        placement="left"
                                                        overlay={
                                                            <Popover
                                                                id="popover-positioned-left"
                                                                title="Popover left"
                                                                className="p-2"
                                                            >
                                                                Unable to delete. Transactions exist for this entry.
                                                            </Popover>
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCircleInfo}
                                                            className="ps-2"
                                                            style={{ color: '#6164ef', marginTop: '5px' }}
                                                        />
                                                    </OverlayTrigger>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </tr>
                            ))}
                            {filteredData?.length > 20 && filteredData !== null && (
                                <LoadMoreTableDataInMaster HandleTableViewRows={setTableViewData} />
                            )}
                        </tbody>
                    </table>

                    <DeleteModal
                        heading={'Record'}
                        confirmDelete={(data: any) => {
                            handleDeleteBtn(data);
                            setShowDeleteModal(false);
                        }}
                        showDeleteModal={showDeleteModal}
                        handleCloseDeleteModal={handleCloseDeleteModal}
                        deleteRecord={deleteRecord}
                    />
                </div>
            ) : (
                <NoRecord title="" content="Records Not Found !!" />
            )}
        </>
    );
};

export default MasterTableListing;




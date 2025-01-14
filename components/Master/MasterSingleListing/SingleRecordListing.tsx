import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoadMoreTableDataInMaster from '../LoadMoreTableDataInMaster';
import NoRecord from '@/components/General/NoRecord';
import DeleteModal from '@/components/DeleteModal';
import AddRecordModal from '../AddRecordModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styled from '../../../styles/master.module.css';

const SingleRecordListing = ({
  karigarData,
  defaultData,
  HandleSearchInput,
  placeholder,
  showDeleteModal,
  handleCloseDeleteModal,
  handleShowDeleteModal,
  deleteRecord,
  showAddRecord,
  handleShowAddRecord,
  handleCloseAddRecord,
  inputValue,
  HandleInputValue,
  error,
  handleUpdate,
  handleDelete,
}: any) => {
  const [tableViewData, setTableViewData] = useState<any>(20);
  const router: any = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];

  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };

  // const HandleDetails = (name: any) => {
  //   router.push({
  //     pathname: '/master/[karigarId]/KarigarDetailsMaster',
  //     query: {
  //       name: name,
  //       placeholder: placeholder,
  //     },
  //   });
  // };
  const popoverLeft = (
    <Popover id="popover-positioned-left" title="Popover left" className="p-2">
      Unable to delete. Transactions exist for this entry.
    </Popover>
  );
  return (
    <div>
      {defaultData?.length > 0 ? (
        <>
          <div className="container d-flex justify-content-between p-0 px-3">
            <div>
              <input
                type="text"
                name="name"
                id="name"
                aria-describedby="emailHelp"
                className="form-control input-fields custom-input-field ps-2 p-1"
                placeholder={placeholder}
                onChange={HandleSearchInput}
              />
            </div>
            <div className="d-flex align-items-end">
              {karigarData?.length > 0 && (
                <div className="text-end pe-3 p-0 text-gray small ">
                  {karigarData?.slice(0, tableViewData)?.length} of{' '}
                  {karigarData?.length < 10
                    ? '0' + karigarData?.length
                    : karigarData?.length}
                </div>
              )}
            </div>
          </div>

          <div className="table-responsive  mt-2 px-3">
            <table className="table table-hover table-striped w-100 ">
              <thead>
                <tr className="table_row">
                  <th
                    scope="col"
                    className="thead text-start"
                    style={{ width: '80px' }}
                  >
                    Sr.No
                  </th>
                  <th scope="col" className="thead text-start">
                    {placeholder}
                  </th>
                  {
                    (key === "karigar" || key === "kundanKarigar") && (
                      <th scope="col" className="thead text-start">
                        Karigar code
                      </th>
                    )
                  }
                  <th scope="col" className="thead text-start"></th>
                </tr>
              </thead>
              <tbody>
                {karigarData?.length > 0 &&
                  karigarData !== null &&
                  karigarData
                    .slice(0, tableViewData)
                    .map((item: any, i: any) => (
                      <tr key={i}>
                        <td className="table-body-row cursor">{i + 1}</td>
                        <td
                          className="table-body-row cursor"
                        >
                          {typeof item.karigar_name === 'string'
                            ? item.karigar_name?.toUpperCase()
                            : item.karigar_name}
                        </td>
                        {
                          (key === "karigar" || key === "kundanKarigar") && (
                            <td
                              className="table-body-row cursor"

                            >
                              {typeof item.karigar_name === 'string'
                                ? item.karigar_code?.toUpperCase()
                                : item.karigar_code}
                            </td>
                          )
                        }
                        <td className="table-body-row cursor w-25 p-0">
                          <div className="d-flex justify-content-around">
                            <button
                              className={`btn btn-link p-0 small ${styled.actions_btn}`}
                              onClick={() => handleShowAddRecord(item)}
                            >
                              Update
                            </button>
                            <div className="d-flex justify-space-between">
                              <button
                                className={`btn btn-link text-danger p-0 ${styled.actions_btn}`}
                                onClick={() =>
                                  handleShowDeleteModal(item?.karigar_name)
                                }
                                disabled={item?.delete === 0 ? true : false}
                              >
                                Delete
                              </button>
                              {item?.delete === 0 ? (
                                <OverlayTrigger
                                  trigger={['hover', 'click']}
                                  rootClose
                                  placement="left"
                                  overlay={popoverLeft}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    className=" ps-2"
                                    style={{
                                      color: '#6164ef',
                                      marginTop: '5px',
                                    }}
                                  />
                                </OverlayTrigger>
                              ) : (
                                <span className="px-2 mx-1"></span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                {karigarData?.length > 20 && karigarData !== null && (
                  <LoadMoreTableDataInMaster
                    HandleTableViewRows={HandleTableViewRows}
                  />
                )}
              </tbody>
            </table>
            <DeleteModal
              heading={placeholder}
              confirmDelete={handleDelete}
              showDeleteModal={showDeleteModal}
              handleCloseDeleteModal={handleCloseDeleteModal}
              deleteRecord={deleteRecord}
            />
            <AddRecordModal
              showAddRecord={showAddRecord}
              handleCloseAddRecord={handleCloseAddRecord}
              inputValue={inputValue}
              HandleInputValue={HandleInputValue}
              error1={error}
              handleUpdate={handleUpdate}
              placeholder1={placeholder}
              isMultiple={false}
            />
          </div>
        </>
      ) : (
        <NoRecord title="" content="No Records Found" />
      )}
    </div>
  );
};

export default SingleRecordListing;

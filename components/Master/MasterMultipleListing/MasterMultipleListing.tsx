import NoRecord from '@/components/General/NoRecord';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadMoreTableDataInMaster from '../LoadMoreTableDataInMaster';
import DeleteModal from '@/components/DeleteModal';
import UpdateRecordModal from '../AddRecordModal';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import styled from '../../../styles/master.module.css';

const MasterMaterialListing = ({
  materialList,
  defaultData,
  handleInputChange1,
  handleInputChange2,
  handleInputChange3,
  placeholder1,
  placeholder2,
  placeholder3,
  value,
  showDeleteModal,
  handleCloseDeleteModal,
  handleShowDeleteModal,
  deleteRecord,
  showAddRecord,
  handleShowAddRecord,
  handleCloseAddRecord,
  nameValue,
  HandleNameChange,
  handleUpdate,
  error1,
  error2,
  error3,
  clientGroup,
  selectDropDownReset,
  setSelectDropDownReset,
  searchClient,
  setSearchClient,
  handleDelete,
  salesGroup,
  setSalesGroup
}: any) => {
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };
  const router = useRouter();

  const popoverLeft = (
    <Popover id="popover-positioned-left" title="Popover left" className="p-2">
      Unable to delete. Transactions exist for this entry.
    </Popover>
  );

  return (
    <div>
      {defaultData?.length > 0 ? (
        <>
          <div className="d-flex justify-content-between px-3 ">
            <div
              className={` d-flex justify-content-start align-items-center `}
            ></div>
            <div className="">
              <input
                type="text"
                name="input1"
                id="input1"
                aria-describedby="emailHelp"
                className="form-control input-fields custom-input-field ps-2 p-1"
                placeholder={placeholder1}
                onChange={handleInputChange1}
              />
            </div>
            <div className="mx-1">
              <input
                type="text"
                name="input2"
                id="input2"
                aria-describedby="emailHelp"
                className="form-control input-fields custom-input-field ps-2 p-1"
                placeholder={placeholder2}
                onChange={handleInputChange2}
              />
            </div>
            <div className="">
              {(value === 'material' || value === 'subCategory') && (
                <input
                  type="text"
                  name="input3"
                  id="input3"
                  aria-describedby="emailHelp"
                  className="form-control input-fields custom-input-field ps-2 p-1"
                  placeholder={placeholder3}
                  onChange={handleInputChange3}
                />
              )}
            </div>
            <div className="w-50 d-flex align-items-end justify-content-end">
              {materialList?.length > 0 && (
                <div className="text-end pe-3 text-gray small m-0">
                  {materialList?.slice(0, tableViewData)?.length} of{' '}
                  {materialList?.length < 10
                    ? '0' + materialList?.length
                    : materialList?.length}
                </div>
              )}
            </div>
          </div>

          <div className="table-responsive mt-2 px-3">
            <table className="table table-hover table-striped  w-100 ">
              <thead>
                <tr className="table_row">
                  <th className="thead text-start">Sr.No</th>
                  <th className="thead text-start ">{placeholder1}</th>
                  <th className="thead text-start ">{placeholder2}</th>
                  {value === "client" && (
                    <>
                      <th className="thead text-start ">Sales group</th>
                      <th className="thead text-start ">Kun</th>
                      <th className="thead text-start ">CS </th>
                      <th className="thead text-start ">OT </th>
                      <th className="thead text-start ">BB</th>

                    </>
                  )}

                  {(value === 'material' || value === 'subCategory') && (
                    <th className="thead text-start ">{placeholder3}</th>
                  )}

                  <th className="thead text-start"></th>
                </tr>
              </thead>
              <tbody>
                {materialList?.length > 0 &&
                  materialList !== null &&
                  materialList
                    .slice(0, tableViewData)
                    .map((item: any, i: any) => (
                      <tr key={i}>
                        <td
                          className="table-body-row cursor"
                          style={{ width: '80px' }}
                        >
                          {i + 1}
                        </td>
                        <td
                          className={`table-body-row cursor ${value === 'kunCsOtCategory' ||
                            value === 'BBCategory'
                            ? 'w-25'
                            : ' w-auto '
                            } `}
                        >
                          {typeof item.material === 'string'
                            ? item.material?.toUpperCase()
                            : item.material}
                        </td>
                        <td className={`table-body-row cursor w-auto`}>
                          {item.material_abbr
                            ? typeof item.material_abbr === 'string'
                              ? item.material_abbr?.toUpperCase()
                              : item.material_abbr
                            : typeof item.type === 'string'
                              ? item.type?.toUpperCase()
                              : item.type}
                        </td>
                        {(value === "client" && (
                          <>
                            <td className="table-body-row cursor w-auto">
                              {item?.sales_group}
                            </td>
                            <td className="table-body-row cursor w-auto">
                              {item?.kundan_category}
                            </td>
                            <td className="table-body-row cursor w-auto">
                              {item?.cs_category}
                            </td>
                            <td className="table-body-row cursor w-auto">
                              {item?.ot_category}
                            </td>
                            <td className="table-body-row cursor w-auto">
                              {item?.bb_category}
                            </td>
                          </>
                        ))}
                        {(value === 'material' || value === 'subCategory') && (
                          <td className="table-body-row cursor w-auto">
                            {typeof item.material_group === 'string'
                              ? item.material_group?.toUpperCase()
                              : item.material_group}
                          </td>
                        )}

                        <td className="table-body-row cursor w-25 p-0">
                          <div className="d-flex justify-content-around">
                            <button
                              className={`btn btn-link p-0  ${styled.actions_btn}`}
                              onClick={() => handleShowAddRecord(item)}
                            >
                              Update
                            </button>
                            <div className="d-flex justify-space-between">
                              <button
                                className={`btn btn-link text-danger p-0 ${styled.actions_btn}`}
                                onClick={() =>
                                  handleShowDeleteModal(item?.material)
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
                {materialList?.length > 20 && materialList !== null && (
                  <LoadMoreTableDataInMaster
                    HandleTableViewRows={HandleTableViewRows}
                  />
                )}
              </tbody>
            </table>
            <DeleteModal
              heading={'Record'}
              confirmDelete={handleDelete}
              showDeleteModal={showDeleteModal}
              handleCloseDeleteModal={handleCloseDeleteModal}
              deleteRecord={deleteRecord}
            />
            <UpdateRecordModal
              showAddRecord={showAddRecord}
              handleCloseAddRecord={handleCloseAddRecord}
              nameValue={nameValue}
              HandleNameChange={HandleNameChange}
              handleUpdate={handleUpdate}
              error1={error1}
              error2={error2}
              error3={error3}
              placeholder1={placeholder1}
              placeholder2={placeholder2}
              placeholder3={placeholder3}
              DropdownList={clientGroup}
              selectDropDownReset={selectDropDownReset}
              setSelectDropDownReset={setSelectDropDownReset}
              searchClient={searchClient}
              setSearchClient={setSearchClient}
              value={value}
              isMultiple={true}
              salesGroup={salesGroup}
              setSalesGroup={setSalesGroup}
            />
          </div>
        </>
      ) : (
        <NoRecord title="" content="Records Not Found !!" />
      )}
    </div>
  );
};

export default MasterMaterialListing;

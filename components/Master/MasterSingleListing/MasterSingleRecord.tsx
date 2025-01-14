import TabSection from '@/components/TabSection';
import { useState } from 'react';
import MasterListing from '../MasterListing';
import AddKarigar from './AddRecord';
import SingleRecordListing from './SingleRecordListing';

const MasterSingleRecord: any = ({
  karigarData,
  inputValue,
  HandleInputValue,
  HandleSubmit,
  error,
  value,
  placeholder,
  tab1,
  tab2,
  showDeleteModal,
  handleCloseDeleteModal,
  handleShowDeleteModal,
  deleteRecord,
  showAddRecord,
  handleShowAddRecord,
  handleCloseAddRecord,
  handleUpdate,
  handleDelete
}: any) => {
  const [searchField, setSearchField] = useState<any>('');
  const HandleSearchInput: any = (e: any) => {
    setSearchField(e.target.value);
  };
  const filterList: any =
    karigarData?.length > 0 &&
    karigarData?.filter((value: any) => {
      return value.karigar_name
        ?.toLowerCase()
        .includes(searchField?.toLowerCase());
    });
  return (
    <div className="container-lg">
      <MasterListing value={value} />
      <div>
        <div className="d-flex justify-content-center">
          <TabSection firstTabHeading={tab1} secondTabHeading={tab2} />
        </div>

        <div
          className="tab-content d-flex justify-content-center"
          id="pills-tabContent"
        >
          <div
            className="tab-pane fade show active tab-width  "
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <SingleRecordListing
              karigarData={filterList}
              defaultData={karigarData}
              HandleSearchInput={HandleSearchInput}
              placeholder={placeholder}
              showDeleteModal={showDeleteModal}
              handleCloseDeleteModal={handleCloseDeleteModal}
              handleShowDeleteModal={handleShowDeleteModal}
              deleteRecord={deleteRecord}
              showAddRecord={showAddRecord}
              handleShowAddRecord={handleShowAddRecord}
              handleCloseAddRecord={handleCloseAddRecord}
              inputValue={inputValue}
              HandleInputValue={HandleInputValue}
              error={error}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </div>
          <AddKarigar
            inputValue={inputValue}
            HandleInputValue={HandleInputValue}
            error={error}
            HandleSubmit={HandleSubmit}
            placeholder={placeholder}
            placeholder2={"Karigar Code"}
          />
        </div>
      </div>
    </div>
  );
};
export default MasterSingleRecord;

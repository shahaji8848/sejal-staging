import { useRouter } from 'next/router';
import styles from '../../../styles/readyReceipts.module.css';
import DeleteModal from '@/components/DeleteModal';
import { buttonLoadingState } from '@/store/slices/btn-loading-slice';
import { useSelector } from 'react-redux';

const ReadyReceiptBtnSection = ({
  data,
  stateForDocStatus,
  handleUpdateReceipt,
  setReadOnlyFields,
  readOnlyFields,
  setShowSaveButtonForAmendFlow,
  showSaveButtonForAmendFlow,
  setStateForDocStatus,
  handleAmendButtonForDuplicateChitti,
  handlePrintApi,
  HandleUpdateDocStatus,
  HandleDeleteReceipt,
  printApiMethod,
  printApiEntity,
  specificDataFromStore,
  showDeleteModal,
  handleCloseDeleteModal,
  handleShowDeleteModal,
  deleteRecord,
}: any) => {
  const { query } = useRouter();
  const router = useRouter();

  const pathParts = router?.asPath?.split('/');
  const receiptType = pathParts[2];
  const buttonLoadingStateFromStore: any = useSelector(buttonLoadingState);

  const HandleAmendButtonChanges: any = async () => {
    setShowSaveButtonForAmendFlow(true);
    setStateForDocStatus(true);
    setReadOnlyFields(false);
  };
  const dateFlag =
    data?.posting_date ===
    new Date().toISOString().split('T')[0].split('-').reverse().join('-')
      ? false
      : true;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="">
          <button
            type="button"
            className={`btn btn-outline-primary px-2 py-0 me-2`}
            onClick={() => {
              router.push(`/readyReceipt/${receiptType}`);
              specificDataFromStore = null;
            }}
          >
            Back
          </button>
          {stateForDocStatus === true && data?.docstatus === 0 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Not saved
              </span>
            </button>
          )}
          {stateForDocStatus === false && data?.docstatus === 0 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>Draft</span>
            </button>
          )}
          {data?.docstatus === 1 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Submitted
              </span>
            </button>
          )}
          {data?.docstatus === 2 && readOnlyFields && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Cancelled
              </span>
            </button>
          )}
          {showSaveButtonForAmendFlow &&
            stateForDocStatus &&
            readOnlyFields === false && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.docstatus_button_text}`}>
                  Not saved
                </span>
              </button>
            )}
        </div>
        <div className={`${styles.button_field}`}>
          {data?.docstatus === 0 && stateForDocStatus && (
            <button
              type="button"
              className={` btn btn-outline-primary px-2 py-0 me-2`}
              onClick={handleUpdateReceipt}
              disabled={buttonLoadingStateFromStore?.loading}
            >
              {buttonLoadingStateFromStore?.loading === true && (
                <i className="fa fa-spinner me-1"></i>
              )}
              Save
            </button>
          )}
          {(data?.docstatus === 0 || data?.docstatus === 1) &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`btn btn-outline-primary px-2 py-0 me-2`}
                disabled={buttonLoadingStateFromStore?.loading}
                onClick={() =>
                  handlePrintApi(
                    query?.receiptId,
                    printApiMethod,
                    printApiEntity
                  )
                }
              >
                {buttonLoadingStateFromStore?.loading === true && (
                  <i className="fa fa-spinner me-1"></i>
                )}
                Print
              </button>
            )}
          {data?.docstatus === 0 && stateForDocStatus === false && (
            <button
              type="button"
              className={`btn btn-outline-primary px-2 py-0 me-2`}
              onClick={() => HandleUpdateDocStatus('1')}
              disabled={dateFlag}
            >
              Submit
            </button>
          )}

          {data?.docstatus === 1 && stateForDocStatus === false && (
            <button
              type="button"
              className={`btn btn-outline-primary px-2 py-0 me-2`}
              onClick={() => HandleUpdateDocStatus('2')}
            >
              Cancel
            </button>
          )}

          {data?.docstatus === 2 && stateForDocStatus === false && (
            <button
              type="button"
              className={`btn btn-outline-primary px-2 py-0 me-2`}
              onClick={HandleAmendButtonChanges}
              disabled={dateFlag}
            >
              Amend
            </button>
          )}

          {showSaveButtonForAmendFlow &&
            stateForDocStatus &&
            readOnlyFields === false && (
              <button
                type="submit"
                onClick={handleAmendButtonForDuplicateChitti}
                disabled={buttonLoadingStateFromStore?.loading}
                className={`btn btn-outline-primary px-2 py-0 me-2`}
              >
                {buttonLoadingStateFromStore?.loading === true && (
                  <i className="fa fa-spinner me-1"></i>
                )}
                Save
              </button>
            )}

          {data?.docstatus === 2 && (
            <button
              type="button"
              className={`btn btn-outline-primary px-2 py-0 me-2 `}
              onClick={() => handleShowDeleteModal(query?.receiptId)}
              disabled={dateFlag}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <DeleteModal
        heading={'Purchase Receipt'}
        confirmDelete={HandleDeleteReceipt}
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        deleteRecord={deleteRecord}
      />
    </>
  );
};

export default ReadyReceiptBtnSection;

import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { get_detail_sales_return_data } from '@/store/slices/Sales/get-detail-sales-return-slice';
import DeleteModal from '@/components/DeleteModal';
import styles from '../../../../styles/readyReceipts.module.css';
import { buttonLoadingState } from '@/store/slices/btn-loading-slice';

const SaleReturnsButtonSection = ({
  stateForDocStatus,
  setStateForDocStatus,
  handleUpdateDeliveryNote,
  readOnlyFields,
  setReadOnlyFields,
  showSaveButtonForAmendFlow,
  setShowSaveButtonForAmendFlow,
  HandleUpdateSalesdocStatus,
  HandleAmendButtonForSalesReturn,
  HandleDeleteDeliveryNote,
  handlePrintApi,
  showDeleteModal,
  handleCloseDeleteModal,
  handleShowDeleteModal,
  deleteRecord,
}: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const buttonLoadingStateFromStore: any = useSelector(buttonLoadingState);
  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_sales_return_data
  );

  const HandleAmendButtonChanges: any = async () => {
    setShowSaveButtonForAmendFlow(true);
    setStateForDocStatus(true);
    setReadOnlyFields(false);
  };

  const dateFlag =
    DetailOfDeliveryNoteFromStore?.data?.posting_date ===
    new Date().toISOString().split('T')[0].split('-').reverse().join('-')
      ? false
      : true;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="">
          <button
            type="button"
            className={`btn btn-outline-primary px-2 py-0 me-2`}
            onClick={() => router.back()}
          >
            Back
          </button>

          {stateForDocStatus === true &&
            DetailOfDeliveryNoteFromStore?.docStatus === 0 && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.dosStatus_button_text}`}>
                  Not saved
                </span>
              </button>
            )}
          {stateForDocStatus === false &&
            DetailOfDeliveryNoteFromStore?.docStatus === 0 && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.docstatus_button_text}`}>Draft</span>
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 1 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Submitted
              </span>
            </button>
          )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 2 && readOnlyFields && (
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
          {DetailOfDeliveryNoteFromStore?.docStatus === 0 &&
            stateForDocStatus && (
              <button
                type="button"
                className={`btn btn-outline-primary px-2 py-0 me-2`}
                onClick={handleUpdateDeliveryNote}
                disabled={buttonLoadingStateFromStore?.loading}
              >
                {buttonLoadingStateFromStore?.loading === true && (
                  <i className="fa fa-spinner me-1"></i>
                )}
                Save
              </button>
            )}
          {(DetailOfDeliveryNoteFromStore?.docStatus === 0 ||
            DetailOfDeliveryNoteFromStore?.docStatus === 1) &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`btn btn-outline-primary px-2 py-0 me-2`}
                onClick={() => handlePrintApi(query?.deliveryNoteId)}
                disabled={buttonLoadingStateFromStore?.loading}
              >
                {buttonLoadingStateFromStore?.loading === true && (
                  <i className="fa fa-spinner me-1"></i>
                )}
                Print
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 0 &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`btn btn-outline-primary px-2 py-0 me-2`}
                onClick={() => HandleUpdateSalesdocStatus('1')}
                disabled={dateFlag}
              >
                Submit
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 1 &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`btn btn-outline-primary px-2 py-0 me-2`}
                onClick={() => HandleUpdateSalesdocStatus('2')}
              >
                Cancel
              </button>
            )}

          {DetailOfDeliveryNoteFromStore?.docStatus === 2 &&
            stateForDocStatus === false && (
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
                onClick={HandleAmendButtonForSalesReturn}
                disabled={buttonLoadingStateFromStore?.loading}
                className={`btn btn-outline-primary px-2 py-0 me-2 `}
              >
                {buttonLoadingStateFromStore?.loading === true && (
                  <i className="fa fa-spinner me-1"></i>
                )}
                Save
              </button>
            )}

          {DetailOfDeliveryNoteFromStore?.docStatus === 2 && (
            <button
              type="button"
              className={`btn btn-outline-primary px-2 py-0 me-2 `}
              onClick={() => handleShowDeleteModal(query?.deliveryNoteId)}
              disabled={dateFlag}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <DeleteModal
        heading={'Delivery Note'}
        confirmDelete={HandleDeleteDeliveryNote}
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        deleteRecord={deleteRecord}
      />
    </>
  );
};

export default SaleReturnsButtonSection;

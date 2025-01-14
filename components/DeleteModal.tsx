import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({
  heading,
  showDeleteModal,
  handleCloseDeleteModal,
  deleteRecord,
  confirmDelete,
}: any) => {
  return (
    <>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to delete this {heading}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>confirmDelete(deleteRecord)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;

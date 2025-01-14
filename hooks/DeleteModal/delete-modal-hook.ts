import { useState } from 'react';

export const useDeleteModal = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState('');

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false), setDeleteRecord('');
  };
  const handleShowDeleteModal = (name?: string) => {
    setDeleteRecord(name || '');
    setShowDeleteModal(true);
  };
  return {
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
  };
};

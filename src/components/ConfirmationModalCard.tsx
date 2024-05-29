interface ModalProps {
    closeModal: () => void;
    onSubmit: () => void;
}

export const ConfirmationModalCard = ({ closeModal, onSubmit }: ModalProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
      <div className="flex justify-end">
        <button
          onClick={() => {
            onSubmit();
            closeModal();
          }}
          type="button"
          className="px-4 py-2 text-white bg-blue-600 rounded mr-2"
        >
          Yes
        </button>
        <button
          type="button"
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

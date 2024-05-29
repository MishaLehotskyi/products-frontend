import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {addProduct, deleteProduct, fetchProducts} from '../store/slices/productSlice';
import { ModalCard } from '../components/ModalCard';
import Modal from 'react-modal';
import {UniversalInputType} from '../types/UniversalInputType';
import {ConfirmationModalCard} from '../components/ConfirmationModalCard';
import {Link} from 'react-router-dom';

export const ProductListPage = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeConfirmModal = () => {
    setConfirmModalIsOpen(false);
  };

  const handleSubmit = (productDTO: UniversalInputType) => {
    dispatch(addProduct(productDTO));
  };

  const handleConfirmSubmit = () => {
    dispatch(deleteProduct(deleteId));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return b.count - a.count;
  });

  return (
    <div className="w-[1260px] mx-auto flex flex-col gap-y-5">
      <div>
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-300">
              Add
        </button>
      </div>
      <div className="flex flex-row gap-[20px] text-white flex-wrap">
        {sortedProducts.map(product => {
          return (
            <Link to={`/products/${product.id}`} className="w-[300px] h-[400px] rounded overflow-hidden shadow-lg bg-gray-800 hover:transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <img className="w-full" src={product.imageUrl} alt={product.name} />
              <div className="px-6 py-4 flex flex-col gap-y-1">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-base">
                    Count: {product.count}
                </p>
                <p className="text-base">
                    Size: {product.size.width} x {product.size.height}
                </p>
                <p className="text-base">
                    Weight: {product.weight}
                </p>
                <p className="text-base">
                    Comments: {product.comments.length}
                </p>
                <div>
                  <button
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                      event.preventDefault();
                      setConfirmModalIsOpen(true);
                      setDeleteId(product.id);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                      Delete
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <ModalCard closeModal={closeModal} onSubmit={handleSubmit} title={'Create product'} />
      </Modal>
      <Modal
        isOpen={confirmModalIsOpen}
        onRequestClose={closeConfirmModal}
        contentLabel="Example Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <ConfirmationModalCard closeModal={closeConfirmModal} onSubmit={handleConfirmSubmit} />
      </Modal>
    </div>
  );
};

import Modal from 'react-modal';
import {ModalCard} from '../components/ModalCard';
import {useEffect, useState} from 'react';
import {UniversalInputType} from '../types/UniversalInputType';
import {fetchProduct, updateProduct} from '../store/slices/productSlice';
import {AppDispatch, RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {client} from '../utils/fetchClient';

export const ProductPage = () => {
  const { productId } = useParams();
  const [commentText, setCommentText] = useState('');
  const { currentProduct } = useSelector((state: RootState) => state.products);
  const dispatch: AppDispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleSubmit = (productDTO: UniversalInputType) => {
    dispatch(updateProduct({ id: productId , productDTO }));
  };

  const handleCommentDelete = async (id: number) => {
    await client.delete('/comments/' + id);
    dispatch(fetchProduct(productId));
  };

  const handleCommentAdd = async () => {
    await client.post('/comments/' + productId, {description: commentText});
    dispatch(fetchProduct(productId));
    setCommentText('');
  };

  return (
    <div className="w-[1260px] mx-auto flex flex-col gap-y-5">
      <div>
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-300">
                    Edit
        </button>
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:h-full md:w-96"
                src={currentProduct?.imageUrl}
                alt={'productImage'}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            Product
              </div>
              <h1 className="block mt-1 text-4xl leading-8 font-bold text-gray-900">
                {currentProduct?.name}
              </h1>
              <p className="mt-2 text-gray-600">
                            Count: {currentProduct?.count}
                <br />
                            Size: {currentProduct?.size.width} x {currentProduct?.size.height}
                <br />
                            Weight: {currentProduct?.weight}
              </p>
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-900">Comments:</h2>
                <ul className="mt-2 h-[200px] overflow-y-scroll scrollbar-webkit">
                  {currentProduct?.comments.map((comment, index) => (
                    <li key={index} className="text-gray-600 w-[150px] flex justify-between items-center">
                      {comment.description}
                      <button
                        className="bg-red-500 text-white rounded-full p-2 hover:bg-red-700 focus:outline-none"
                        onClick={() => {
                          handleCommentDelete(comment.id);
                        }}
                        aria-label="Delete comment"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow p-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={handleCommentAdd}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <ModalCard closeModal={closeModal} onSubmit={handleSubmit} title={'Edit product'} initialValue={currentProduct}/>
      </Modal>
    </div>
  );
};

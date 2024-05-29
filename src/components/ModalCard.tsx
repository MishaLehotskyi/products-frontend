import { ChangeEvent, useState } from 'react';
import { UniversalInputType } from '../types/UniversalInputType';
import { Product } from '../types/Product';

interface ModalProps {
    closeModal: () => void;
    onSubmit: (productDTO: UniversalInputType) => void;
    title: string;
    initialValue?: Product | null;
}

export const ModalCard = ({ closeModal, onSubmit, title, initialValue }: ModalProps) => {
  const [input, setInput] = useState<UniversalInputType>({
    imageUrl: initialValue?.imageUrl,
    name: initialValue?.name,
    count: initialValue?.count,
    width: initialValue?.size.width,
    height: initialValue?.size.height,
    weight: initialValue?.weight.slice(0, -1),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      imageUrl: input.imageUrl,
      name: input.name,
      count: input.count,
      size: {
        width: input.width,
        height: input.height,
      },
      weight: input.weight + 'g',
    });

    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
             Name
          </label>
          <input
            value={input.name}
            onChange={handleInputChange}
            required
            name="name"
            type="text"
            className="w-full p-2 mt-1 border rounded"
            placeholder={'Enter product name'}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
             Image URL
          </label>
          <input
            value={input.imageUrl}
            onChange={handleInputChange}
            required
            name="imageUrl"
            type="text"
            className="w-full p-2 mt-1 border rounded"
            placeholder={'Enter image url'}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
                        Product Count
          </label>
          <input
            value={input.count}
            onChange={handleInputChange}
            required
            name="count"
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                                e.key !== 'Backspace' &&
                                e.key !== 'Delete'
              ) {
                e.preventDefault();
              }
            }}
            type="text"
            className="w-full p-2 mt-1 border rounded"
            placeholder={'Enter product count'}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
                        Size
          </label>
          <input
            value={input.width}
            onChange={handleInputChange}
            required
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                                e.key !== 'Backspace' &&
                                e.key !== 'Delete'
              ) {
                e.preventDefault();
              }
            }}
            name="width"
            type="text"
            className="w-full p-2 mt-1 border rounded"
            placeholder={'Enter width'}
          />
          <input
            value={input.height}
            onChange={handleInputChange}
            required
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                                e.key !== 'Backspace' &&
                                e.key !== 'Delete'
              ) {
                e.preventDefault();
              }
            }}
            name="height"
            type="text"
            className="w-full p-2 mt-1 border rounded"
            placeholder={'Enter height'}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
              Weight
          </label>
          <input
            value={input.weight}
            onChange={handleInputChange}
            required
            name="weight"
            type="text"
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                                e.key !== 'Backspace' &&
                                e.key !== 'Delete'
              ) {
                e.preventDefault();
              }
            }}
            className="w-full p-2 mt-1 border rounded"
            placeholder={'Enter product weight'}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded mr-2"
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
            onClick={closeModal}
          >
             Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

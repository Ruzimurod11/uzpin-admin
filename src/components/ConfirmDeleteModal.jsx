// ConfirmDeleteModal.js

import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Haqiqatan ham o'chirmoqchimisiz?",
  description = "Bu amalni bekor qilib bo'lmaydi.",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-md rounded-lg bg-white shadow-lg dark:bg-gray-800">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-2xl text-red-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {title}
            </h2>
          </div>
          <p className="mt-3 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <div className="flex justify-end gap-4 p-5">
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Yo&apos;q
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            Ha
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

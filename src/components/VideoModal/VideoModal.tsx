"use client";

import React from "react";
import { MdClose } from "react-icons/md";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-lg dark:bg-gray-800">
        <button
          className="absolute right-4 top-4 z-[1000] h-10 w-10 bg-[black] text-3xl text-primary"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="p-4">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="h-[500px] w-full rounded-md"
            />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300">
              Video yuklanmadi.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

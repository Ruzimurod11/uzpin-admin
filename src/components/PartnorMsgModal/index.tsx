import React, { useState } from "react";
import UploadComponent from "../UploadComponent";
import axiosInstance from "@/libs/axios";
import { toast } from "react-toastify";

interface Partner {
  id: string;
  partner_name: string;
  firstname: string;
}

interface ModalProps {
  partners: Partner[];
  onClose: () => void;
}

const PartnorModalMsg: React.FC<ModalProps> = ({ partners, onClose }) => {
  const [selectedBot, setSelectedBot] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [fileType, setFileType] = useState<"photo" | "video">("photo");

  const handleUploadSuccess = (key: string, url: string) => {
    setFile(url);
  };

  const handleSend = async () => {
    if (!selectedBot || !text || !file) {
      toast.warn("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    const payload = {
      bot: selectedBot,
      text: text,
      file: file,
      file_type: fileType,
    };

    try {
      await axiosInstance.post("/root/mailing/send", payload);
      onClose();
      toast.success("Xabar muvofaqiyatli jo'natildi.");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Xabar jo'natilmadi.");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-gray-700">Xabar yuborish</h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Botni tanlang
          </label>
          <select
            value={selectedBot}
            onChange={(e) => setSelectedBot(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          >
            <option value="">Tanlang...</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.partner_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Matn
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            rows={3}
            placeholder="Xabar matnini kiriting"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Fayl URL
          </label>

          <UploadComponent
            onUploadSuccess={(url) => handleUploadSuccess("file", url)}
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Fayl turi
          </label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value as "photo" | "video")}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          >
            <option value="photo">Rasm</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleSend}
            className="rounded bg-primary px-4 py-2 text-white"
          >
            Yuborish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnorModalMsg;

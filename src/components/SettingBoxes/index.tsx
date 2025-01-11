"use client";
import React, { useState, useEffect } from "react";
import { TbPasswordFingerprint } from "react-icons/tb";
import UploadComponent from "../UploadComponent";
import { FaRegUser } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import axiosInstance from "@/libs/axios";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

const SettingBoxes = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    photo: "",
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get("/root/profile");
        const data = response.data;
        setFormData({
          fullname: data.fullname || "",
          email: data.email || "",
          phone: data.phone || "",
          photo: data.photo || "",
        });
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadSuccess = (key: string, url: string) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: url,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const updatedData: any = { ...formData };

    if (password && newPassword) {
      if (newPassword !== confirmPassword) {
        console.log("Yangi parollar mos kelmadi!");
        setLoading(false);
        return toast.error("Parollar mos kelmadi");
      }
      updatedData.old_password = password;
      updatedData.new_password = newPassword;
      updatedData.confirm_password = confirmPassword;
    }

    try {
      await axiosInstance.put("/root/profile", updatedData);
      localStorage.setItem("profile", JSON.stringify(updatedData));
      toast.success("Ma'lumotlar o'zgartirildi");
      // location.reload();
    } catch (error) {
      console.error("Ma'lumotlarni saqlashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Shaxsiy Ma&apos;lumot
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="fullname"
                  >
                    Ism
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <FaRegUser />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="fullname"
                      id="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Ism"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="phone"
                  >
                    Telefon Nomer
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <LuPhone />
                    </span>
                    <InputMask
                      mask="+999 (99)-999-99-99"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Telefon nomer"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <CiMail />
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="photo"
                  >
                    Rasm
                  </label>
                  <UploadComponent
                    onUploadSuccess={(url) => handleUploadSuccess("photo", url)}
                  />
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="password"
                  >
                    Eski Parol
                  </label>
                  <div className="relative">
                    <TbPasswordFingerprint className="absolute left-4.5 top-1/2 -translate-y-1/2" />
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Eski parol"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="newPassword"
                  >
                    Yangi Parol
                  </label>
                  <div className="relative">
                    <TbPasswordFingerprint className="absolute left-4.5 top-1/2 -translate-y-1/2" />
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Yangi parol"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="confirmPassword"
                  >
                    Parolni tasdiqlang
                  </label>
                  <div className="relative">
                    <TbPasswordFingerprint className="absolute left-4.5 top-1/2 -translate-y-1/2" />
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Parolni tasdiqlang"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                  disabled={loading}
                >
                  {loading ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingBoxes;

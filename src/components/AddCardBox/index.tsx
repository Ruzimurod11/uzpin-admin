"use client";
import SelectGroupOne from "@/components/SelectGame/SelectGroupOne";
import SwitcherThree from "@/components/SelectOption/SwitcherThree";
import UploadComponent from "@/components/UploadComponent";
import axiosInstance from "@/libs/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

export default function AddCardBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [forms, setForms] = useState<any[]>([]);
  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];

  const [formData, setFormData] = useState({
    photo: "",
    card_name: "",
    card_number: "",
    card_holder: "",
    currency: "",
    video_url: "",
    qr_code: "",
    is_active: true,
    have_extra: false,
    extra_cards: [
      {
        id: "",
        card_number: "",
        full_name: "",
        bank_name: "",
        phone_number: "",
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [haveExtra, setHaveExtra] = useState(false);

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (extractedValue) {
        try {
          const response = await axiosInstance.get(
            `/root/card/${extractedValue}/detail`,
          );
          const {
            photo,
            card_name,
            card_number,
            card_holder,
            qr_code,
            currency,
            is_active,
            have_extra,
            video_url,
            extra_cards,
          } = response.data;

          setFormData({
            photo: photo || "",
            card_name: card_name || "",
            card_number: card_number || "",
            card_holder: card_holder || "",
            qr_code: qr_code || "",
            currency: currency || "",
            video_url: video_url || "",
            is_active: is_active !== undefined ? is_active : true,
            have_extra: have_extra !== undefined ? have_extra : false,
            extra_cards: extra_cards || [],
          });

          setSelectedGame(currency || "");
          setHaveExtra(have_extra || false);
        } catch (error) {
          console.error("Failed to fetch card details:", error);
        }
      }
    };

    fetchCardDetails();
  }, [extractedValue]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCardsChange = (index: number, e: any) => {
    const { name, value } = e.target;

    if (extractedValue) {
      setFormData((prev) => ({
        ...prev,
        extra_cards: prev.extra_cards.map((card, i) =>
          i === index ? { ...card, [name]: value } : card,
        ),
      }));
    } else {
      setForms((prev) =>
        prev.map((form, i) =>
          i === index ? { ...form, [name]: value } : form,
        ),
      );
    }
  };

  const gameOptions = [
    { value: "UZS", label: "SUM" },
    { value: "RUB", label: "RUBLE" },
    { value: "USD", label: "DOLLOR" },
  ];

  const handleUploadSuccess = (key: string, url: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: url,
    }));
  };

  const handleSelectChange = (value: string) => setSelectedGame(value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (extractedValue) {
        await axiosInstance.put(`/root/card/${extractedValue}/detail`, {
          ...formData,
          currency: selectedGame,
        });

        await Promise.all(
          formData.extra_cards.map((form: any) => {
            if (form.id) {
              return axiosInstance.put(`/root/card/extra/${form.id}/`, {
                ...form,
                card: extractedValue,
              });
            } else {
              return axiosInstance.post(`/root/card/extra/`, {
                ...form,
                card: extractedValue,
              });
            }
          }),
        );

        toast.success("Karta muvaffaqiyatli yangilandi.");
        router.push("/general/add-card");
      } else {
        if (haveExtra === false) {
          await axiosInstance.post(`/root/card/list`, {
            ...formData,
            currency: selectedGame,
          });
          toast.success("Karta muvaffaqiyatli qo'shildi.");
          router.push("/general/add-card");
        } else {
          const response = await axiosInstance.post(`/root/card/list`, {
            ...formData,
            currency: selectedGame,
          });
          const cardId = response.data.id;

          await Promise.all(
            forms.map((form: any) =>
              axiosInstance.post(`/root/card/extra/`, {
                ...form,
                card: cardId,
              }),
            ),
          );

          toast.success("Karta muvaffaqiyatli qo'shildi.");
          router.push("/general/add-card");
        }
      }
    } catch (error) {
      console.error("Karta yangilashda xatolik:", error);
      toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const addExtraCard = () => {
    if (extractedValue) {
      setFormData((prev) => ({
        ...prev,
        extra_cards: [
          ...prev.extra_cards,
          {
            id: "",
            card_number: "",
            full_name: "",
            bank_name: "",
            phone_number: "",
          },
        ],
      }));
    } else {
      setForms((prev) => [
        ...prev,
        {
          card_number: "",
          full_name: "",
          bank_name: "",
          phone_number: "",
        },
      ]);
    }
  };

  const removeExtraCard = (index: number, formId?: string) => {
    if (extractedValue && formId) {
      try {
        axiosInstance.delete(`/root/card/extra/${formId}/`);
        toast.success("Karta muvaffaqiyatli o'chirildi.");
        setFormData((prev) => ({
          ...prev,
          extra_cards: prev.extra_cards.filter((_, i) => i !== index),
        }));
      } catch (error) {
        console.error("Karta o'chirishda xatolik:", error);
        toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    } else {
      setForms((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card"
      >
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Yangi karta ma&apos;lumotlari
            </h3>
          </div>

          <div className="grid grid-cols-6 gap-5.5 p-6.5">
            <div className="col-span-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Karta rasmi
              </label>
              <UploadComponent
                onUploadSuccess={(url) => handleUploadSuccess("photo", url)}
              />
            </div>

            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Karta nomi
              </label>
              <input
                type="text"
                name="card_name"
                value={formData.card_name}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Valyuta turi
              </label>
              <SelectGroupOne
                options={gameOptions}
                selectedOption={selectedGame}
                onChange={handleSelectChange}
              />
            </div>

            <div className={`col-span-3 ${haveExtra ? "hidden" : ""}`}>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Karta egasi
              </label>
              <input
                type="text"
                name="card_holder"
                value={formData.card_holder}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className={`col-span-3 ${haveExtra ? "hidden" : ""}`}>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Karta raqami
              </label>
              {selectedGame === "UZS" ? (
                <InputMask
                  mask="9999 9999 9999 9999"
                  placeholder="0000 0000 0000 0000"
                  type="text"
                  name="card_number"
                  value={formData.card_number}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              ) : (
                <input
                  type="text"
                  name="card_number"
                  value={formData.card_number}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              )}
            </div>

            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Video
              </label>
              <UploadComponent
                onUploadSuccess={(url) => handleUploadSuccess("video_url", url)}
              />
            </div>
            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                To&apos;lov video
              </label>
              <input
                type="text"
                name="video_url"
                placeholder="Video link"
                value={formData.video_url}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                QR Code
              </label>
              <UploadComponent
                onUploadSuccess={(url) => handleUploadSuccess("qr_code", url)}
              />
            </div>
            <div className="col-span-6 flex items-center gap-x-10">
              <div className="col-span-3">
                <SwitcherThree
                  isActive={formData.is_active}
                  text="Holati"
                  onChange={(value: boolean) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      is_active: value,
                    }))
                  }
                />
              </div>

              <div className="col-span-3">
                <SwitcherThree
                  isActive={formData.have_extra}
                  text="MultiCard"
                  onChange={(value: boolean) => {
                    setHaveExtra(value);
                    setFormData((prevData) => ({
                      ...prevData,
                      have_extra: value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="col-span-6 flex flex-col gap-5">
              {(haveExtra || formData.have_extra) && (
                <>
                  {extractedValue &&
                    formData.extra_cards.map((form: any, index: number) => (
                      <div
                        key={index}
                        className="relative grid grid-cols-6 gap-5 rounded border p-4"
                      >
                        <button
                          type="button"
                          onClick={() => removeExtraCard(index, form.id)}
                          className="absolute right-2 top-2 text-red-500 hover:text-red-700"
                          title="Formani o'chirish"
                        >
                          <FaRegTrashAlt />
                        </button>

                        <div className="col-span-3">
                          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Karta raqami
                          </label>
                          {selectedGame === "UZS" ? (
                            <InputMask
                              mask="9999 9999 9999 9999"
                              placeholder="0000 0000 0000 0000"
                              type="text"
                              name="card_number"
                              value={form.card_number}
                              onChange={(e) => handleCardsChange(index, e)}
                              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                            />
                          ) : (
                            <input
                              type="text"
                              name="card_number"
                              value={form.card_number}
                              onChange={(e) => handleCardsChange(index, e)}
                              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                            />
                          )}
                        </div>

                        <div className="col-span-3">
                          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Full name
                          </label>
                          <input
                            type="text"
                            name="full_name"
                            placeholder="Full name"
                            value={form.full_name}
                            onChange={(e) => handleCardsChange(index, e)}
                            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Bank name
                          </label>
                          <input
                            type="text"
                            name="bank_name"
                            placeholder="Bank name"
                            value={form.bank_name}
                            onChange={(e) => handleCardsChange(index, e)}
                            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Phone number
                          </label>
                          <input
                            type="text"
                            name="phone_number"
                            placeholder="Phone number"
                            value={form.phone_number}
                            onChange={(e) => handleCardsChange(index, e)}
                            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    ))}

                  {!extractedValue &&
                    forms.map((form: any, index: number) => (
                      <div
                        key={index}
                        className="relative grid grid-cols-6 gap-5 rounded border p-4"
                      >
                        <button
                          type="button"
                          onClick={() => removeExtraCard(index)}
                          className="absolute right-2 top-2 text-red-500 hover:text-red-700"
                          title="Formani o'chirish"
                        >
                          <FaRegTrashAlt />
                        </button>

                        <div className="col-span-3">
                          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Karta raqami
                          </label>
                          {selectedGame === "UZS" ? (
                            <InputMask
                              mask="9999 9999 9999 9999"
                              placeholder="0000 0000 0000 0000"
                              type="text"
                              name="card_number"
                              value={form.card_number}
                              onChange={(e) => handleCardsChange(index, e)}
                              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                            />
                          ) : (
                            <input
                              type="text"
                              name="card_number"
                              value={form.card_number}
                              onChange={(e) => handleCardsChange(index, e)}
                              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                            />
                          )}
                        </div>

                        <div className="col-span-3">
                          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Full name
                          </label>
                          <input
                            type="text"
                            name="full_name"
                            placeholder="Full name"
                            value={form.full_name}
                            onChange={(e) => handleCardsChange(index, e)}
                            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Bank name
                          </label>
                          <input
                            type="text"
                            name="bank_name"
                            placeholder="Bank name"
                            value={form.bank_name}
                            onChange={(e) => handleCardsChange(index, e)}
                            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Phone number
                          </label>
                          <input
                            type="text"
                            name="phone_number"
                            placeholder="Phone number"
                            value={form.phone_number}
                            onChange={(e) => handleCardsChange(index, e)}
                            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    ))}

                  <button
                    onClick={addExtraCard}
                    disabled={loading}
                    type="button"
                    className="mt-5 flex w-50 items-center justify-center gap-2 rounded bg-green-400 px-5 py-2 text-white"
                  >
                    Karta Biriktirish <FaPlus />
                  </button>
                </>
              )}
            </div>

            <div className="col-span-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex w-40 justify-center rounded bg-green-400 px-5 py-2 text-white"
              >
                {loading ? "Saqlanmoqda..." : "SAQLASH"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

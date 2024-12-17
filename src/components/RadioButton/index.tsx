
const RadioButton = () => {
  return (
    <div>
      <div className="flex items-center space-x-6">
        <label className="flex cursor-pointer items-center border border-blue-500 p-2">
          <input type="radio" name="option" className="peer hidden" />
          <span className="h-5 w-5 border-2 border-gray-300 transition-transform peer-checked:scale-110 peer-checked:border-blue-500 peer-checked:bg-blue-500"></span>
          <span className="ml-3 text-dark dark:text-white">Kirim</span>
        </label>
        <label className="flex cursor-pointer items-center">
          <input type="radio" name="option" className="peer hidden" />
          <span className="h-5 w-5 border-2 border-gray-300 transition-transform peer-checked:scale-110 peer-checked:border-blue-500 peer-checked:bg-blue-500"></span>
          <span className="ml-3 text-dark dark:text-white">Chiqim</span>
        </label>
      </div>
    </div>
  );
};

export default RadioButton;

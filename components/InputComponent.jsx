const InputComponent = ({ type, value, setValue, err, id }) => {
  return (
    <div className="relative">
      <input
        id={id}
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={`${type}`}
        placeholder=" "
        className={`border-b-2 bg-transparent h-[50px] text-white w-[250px] px-[10px] py-[13px] ${
          err ? "border-red-800" : "border-white"
        } placeholder:opacity-0 peer focus:outline-none focus-within:red`}
      />
      <label
        htmlFor={id}
        className={`text-xs absolute left-[8px] -top-[8px] peer-placeholder-shown:translate-y-[21px]
            peer-placeholder-shown:translate-x-[4px] ${
              err ? "text-red-800 bg-white px-1" : "text-white"
            } capitalize peer-placeholder-shown:text-base`}
      >
        {err ? err : type}
      </label>
    </div>
  );
};
export default InputComponent;

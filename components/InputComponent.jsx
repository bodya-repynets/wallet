const InputComponent = ({ type, value, setValue, err, id }) => {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={`${type}`}
        placeholder=" "
        className={`border-b-2 bg-transparent h-[50px] text-white w-[250px] px-[10px] py-[13px] ${
          err ? "border-red-800" : "border-white"
        } placeholder:opacity-0 peer focus:outline-none`}
      />
      <label
        htmlFor={id}
        className="text-xs absolute left-[8px] -top-[8px] peer-placeholder-shown:translate-y-[21px]
            peer-placeholder-shown:translate-x-[4px] text-white capitalize peer-placeholder-shown:text-base"
      >
        {type}
      </label>
    </div>
  );
};
export default InputComponent;

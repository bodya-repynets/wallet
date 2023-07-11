const InputComponent = ({ type, value, setValue, err }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={`${type}`}
      className={`border-2 placeholder:capitalize w-[200px] h-[50px] px-4 hover:border-4 ${err&&'border-red-300'}`}
    />
  );
};
export default InputComponent;

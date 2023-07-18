const ModalButton = ({name, action, color}) => {
  return (
    <button className={`rounded-xl w-[150px] h-[50px] text-white ${color==='red'?'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800':'bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800'}`} onClick={action}>{name}</button>
  )
}
export default ModalButton
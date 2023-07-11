const MainButton = ({text, action}) => {
  return (
    <button className="bg-green-300 rounded-lg hover:bg-green-400 w-[200px] h-[50px]" onClick={action}>{text}</button>
  )
}
export default MainButton
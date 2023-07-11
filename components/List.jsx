'use client'
import { useSelector } from "react-redux"

const List = ({expenses}) => {
    const {user}=useSelector(store=>store.user)
    console.log(expenses)
  return (
    <div>List</div>
  )
}
export default List
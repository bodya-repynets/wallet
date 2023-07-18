import { Dialog } from "@headlessui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterExpenses } from "@/redux/features/expensesSlice";
import ModalButton from "./ModalButton";

const TimeModal = ({ showModal, setShowModal }) => {
  const { expenses } = useSelector((store) => store.expenses);
  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = useState([
    {
      startDate: new Date(new Date().getTime() - 518400000),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleClick = () => {
    const from = timeRange[0].startDate.getTime();
    let to = timeRange[0].endDate.getTime();
    to += 86400000;
    dispatch(filterExpenses({ arr: expenses.all, from, to }));
    setShowModal(false);
  };
  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      className="absolute z-10 top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60"
    >
      <Dialog.Panel>
        <div className="flex flex-col items-center w-screen h-screen md:h-full justify-center md:w-full bg-white md:p-[50px] gap-[10px] md:gap-[50px] md:rounded-2xl">
          <DateRangePicker
            onChange={(item) => setTimeRange([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={timeRange}
            direction="horizontal"
            calendarFocus="backwards"
            maxDate={new Date()}
          />
          <div className="flex flex-col gap-[20px] md:flex-row">
            <ModalButton
              action={() => setShowModal(false)}
              name={"Cancel"}
              color={"red"}
            />
            <ModalButton action={handleClick} name={"Apply"} color={"blue"} />
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
export default TimeModal;

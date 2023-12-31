import Calendar from "react-calendar";
import { OnArgs } from "react-calendar/dist/cjs/shared/types";
import { useState, useEffect } from "react";
import { returnDateID } from "../../utils/functions1";
import { useSelectedNoteStore } from "@/state/selectedNote";

export function DailyNotes() {
	const setSelectedNote = useSelectedNoteStore((state) => state.setSelectedNote);
	const [selectedDate, setSelectedDate] = useState<Date>();
	const [active_start_date, setActiveStartDate] = useState<Date>();

	const changeActiveStartDate = ({ action, activeStartDate, value, view }: OnArgs) => {
		setActiveStartDate(activeStartDate!);
	};

	useEffect(() => {
		setSelectedDate(new Date());
		setActiveStartDate(new Date());
	}, []);

	useEffect(() => {
		selectedDate && setSelectedNote({ type: "dailyNote", id: returnDateID(selectedDate), title: "" });
	}, [selectedDate]);

	const goToToday = () => {
		setSelectedDate(new Date());
		setActiveStartDate(new Date());
	};

	return (
		<>
			<div className="h-full p-5">
				<Calendar
					value={selectedDate}
					onChange={setSelectedDate as any}
					onActiveStartDateChange={changeActiveStartDate}
					activeStartDate={active_start_date}
				/>
				<button
					className="mt-4 w-full rounded-2xl border-2 border-blue-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-slate-50"
					onClick={goToToday}
				>
					Go to Today
				</button>
			</div>
		</>
	);
}

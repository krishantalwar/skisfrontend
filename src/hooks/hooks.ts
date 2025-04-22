// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/app/store"

// Inspired by react-hot-toast library
// import {useMemo} from "react"


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// export const  addMonthsToDate= (date:Date, monthsToAdd:Number): <Date> {

//     const calculation = useMemo(() => {

//         const newDate = new Date(date); // Create a copy of the date to avoid mutating the original date
//         newDate.setMonth(newDate.getMonth() + monthsToAdd); // Add months to the date

//     }, [date,monthsToAdd]);
//     return calculation;
// }



// type UseAddMonthsToDate = (date: Date, monthsToAdd: number) => Date;

// export const useAddMonthsToDate: UseAddMonthsToDate = (date, monthsToAdd) => {
//   const calculatedDate = useMemo(() => {
//     const newDate = new Date(date); // Create a copy of the date to avoid mutating the original date
//     newDate.setMonth(newDate.getMonth() + monthsToAdd); // Add months to the date
//     return newDate;
//   }, [date, monthsToAdd]); // Recompute when either date or monthsToAdd changes
//   return calculatedDate;
// };

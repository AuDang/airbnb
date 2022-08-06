import { addDays } from "date-fns";

export const dateArrayCreator = (startDate, stopDate) => {
  const dateArray = new Array();
  const currentDate = startDate;
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate = addDays(currentDate, 1);
  }
  return dateArray
}
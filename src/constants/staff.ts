import { Staff } from "customTypes/staff";

export enum STAFF_TYPE {
  EMPLOYEE = "employee",
  COVER = "cover"
}
export const EMPTY_STAFF: Staff = {
  id: -1,
  name: "",
  email: "",
  phone: "",
  type: "employee",
  availability: {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false
  },
  on_leave: false
}
export type Staff = {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  availability: string | AvailType;
  on_leave: boolean;
}
export type AvailType = {
  mon: boolean,
  tue: boolean,
  wed: boolean,
  thu: boolean,
  fri: boolean
};
import { STATUS } from 'constants/session'
import { DateTime } from 'luxon'

export type Session = {
  id: number;
  name: string;
  cover_name: string;
  practice: string;
  status: STATUS;
  date: string;
}
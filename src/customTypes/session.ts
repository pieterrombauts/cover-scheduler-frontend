import { STATUS } from 'constants/session'
import { DateTime } from 'luxon'

export type Session = {
  name: string;
  cover_name: string;
  status: STATUS;
  date: DateTime;
}
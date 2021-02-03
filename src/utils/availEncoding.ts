import { AvailType } from 'customTypes/staff'

export const encodeAvail = (obj: AvailType) => {
  let encoded_string = "";
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      encoded_string = encoded_string + "1";
    } else {
      encoded_string = encoded_string + "0";
    }
  }
  console.log(encoded_string);
  return encoded_string;
}
export const decodeAvail = (avail: string | AvailType) => {
  if (typeof avail === 'string') {
    return {
      mon: (avail.charAt(0) === "1"),
      tue: (avail.charAt(1) === "1"),
      wed: (avail.charAt(2) === "1"),
      thu: (avail.charAt(3) === "1"),
      fri: (avail.charAt(4) === "1")
    }
  } else {
    return avail;
  }
}
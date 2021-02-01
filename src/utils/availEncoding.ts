import { AvailType } from 'customTypes/availability'

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
export const decodeAvail = (string: string) => {
  return {
    mon: (string.charAt(0) === "1"),
    tue: (string.charAt(1) === "1"),
    wed: (string.charAt(2) === "1"),
    thu: (string.charAt(3) === "1"),
    fri: (string.charAt(4) === "1")
  }
}
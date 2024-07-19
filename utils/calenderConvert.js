import jalaali from "jalaali-js";

const convertToJalaali = (date) => {
  const d = new Date(date);
  const jDate = jalaali.toJalaali(d);
  const jDateString = `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
  const timeString = d.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${jDateString} ${timeString}`;
};

export { convertToJalaali };

function minutesToHouresFormated(minutes: number): string{
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;

  let result: string = (h < 10 ? "0" + h.toString() : h.toString()) + "h";
  result += " ";
  result += (m < 10 ? "0" + m.toString() : m.toString()) + "m";

  return result;
}

export default minutesToHouresFormated;

function formatDate(obj: Date){
  let month: number = obj.getUTCMonth() + 1; //months from 1-12
  let day: number = obj.getUTCDate();
  let year: number = obj.getUTCFullYear();

  let date: string = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);

  return date;
}

export default formatDate;

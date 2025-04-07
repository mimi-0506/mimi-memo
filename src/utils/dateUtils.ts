export const getFormattedDate = (date: Date) => {
  try {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];
    return `${month}/${day} ${dayName}`;
  } catch (e) {
    if (e instanceof Error) return `오류 발생: ${e.message}`;
    else return "알 수 없는 오류 발생";
  }
};

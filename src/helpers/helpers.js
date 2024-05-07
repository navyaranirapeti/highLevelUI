export const getFormatedDate = (date) => {
  try {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.log("Error while converting date");
  }
};

export const tableHeaders = [
  { name: "Date", val: "date", width: "175px" },
  { name: "Description", val: "description", width: "440px" },
  { name: "Amount", val: "amount", width: "200px" },
  { name: "Type", val: "type", width: "85px" },
  { name: "Balance", val: "balance", width: "200px" },
];

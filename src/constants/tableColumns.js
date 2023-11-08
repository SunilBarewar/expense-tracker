export const expenseTableColumns = [
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ value }) => formatDate(value),
    width: 60,
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Description",
    accessor: "desc",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
];

function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

export const leaderBoardTableColumns = [
  {
    Header: "Index",
    accessor: (row, index) => index + 1,
    width: 50, // Set the width to 50 pixels
  },
  {
    Header: "Name",
    accessor: "name",
    width: 200, // Set the width to 200 pixels
  },
  {
    Header: "Total Expense",
    accessor: "totalExpense",
    width: 150, // Set the width to 150 pixels
  },
];

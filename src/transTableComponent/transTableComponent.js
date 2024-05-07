import React, { useEffect, useState } from "react";
import { getTransactionsAPI } from "../https/service";
import { getFormatedDate, tableHeaders } from "../helpers/helpers";

const pageSize = 5;

const TransactionTableComponent = (props) => {
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalRecCount, setTotalRecCount] = useState(0);

  useEffect(() => {
    onPageChange(1);
  }, [props?.walletId]);

  const onPageChange = async (pageNumber) => {
    try {
      const startIndex = (pageNumber - 1) * pageSize;
      const res = await getTransactionsAPI(
        props?.walletId,
        startIndex,
        pageSize
      );
      setSortedTransactions(res?.body?.transactionData);
      setTotalRecCount(res?.body?.count);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.log("Error while getting transations: ", error);
    }
  };

  const onSorting = (colName) => {
    if (colName === "date" || colName === "amount") {
      currentItems = sortedTransactions.sort((a, b) => {
        const previousVal =
          colName === "date" ? new Date(a[colName]) : a[colName];
        const nextValue =
          colName === "date" ? new Date(b[colName]) : b[colName];
        return sortOrder === "asc"
          ? previousVal - nextValue
          : nextValue - previousVal;
      });
      setSortedTransactions(currentItems);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      return;
    }
  };

  const getContent = (header, data) => {
    return header.val === "date"
      ? getFormatedDate(data[header.val])
      : data[header.val];
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((h) => (
              <th
                key={h.val}
                onClick={() => onSorting(h.val)}
                style={{ width: h.width }}
              >
                {h.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTransactions?.map((d) => (
            <tr key={d?.id}>
              {tableHeaders.map((h) => (
                <td key={h.val}>{getContent(h, d)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer">
        {
          <p
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            key={"<"}
          >{`${"<"}`}</p>
        }
        <p key={currentPage}>{`${currentPage}/${Math.ceil(
          totalRecCount / pageSize
        )}`}</p>
        {
          <p
            onClick={() =>
              currentPage < Math.ceil(totalRecCount / pageSize) &&
              onPageChange(currentPage + 1)
            }
            key={">"}
          >{`${">"}`}</p>
        }
      </div>
    </div>
  );
};

export default TransactionTableComponent;

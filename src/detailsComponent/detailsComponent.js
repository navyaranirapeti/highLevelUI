import React, { useState } from "react";
import { createTransactionAPI, getTransactionsAPI } from "../https/service";
import TransactionTableComponent from "../transTableComponent/transTableComponent";
import { tableHeaders } from "../helpers/helpers";

const DetailsComponent = (props) => {
  const [amount, setAmount] = useState("");
  const [toggle, setToggle] = useState(false);
  const [description, setDescription] = useState("");

  const onTransationClick = async (event) => {
    try {
      event.preventDefault();
      if (!toggle && +amount > +props?.balance) {
        console.log("Cannot make this transaction");
        return;
      }
      const finalAmount = toggle ? amount : -Number(amount);
      const res = await createTransactionAPI(
        props?.walletId,
        description,
        finalAmount
      );
      props?.setBalance(res?.body?.balance);
      setAmount("");
      setDescription("");
    } catch (error) {
      console.log("Error while making transation: ", error);
    }
  };

  const onLinkClick = (e) => {
    e.preventDefault();
    props?.setShowTransactions(!props?.showTransactions);
  };

  const downloadCSV = async () => {
    try {
      const csvHeaders = tableHeaders.map((v) => v.val).join(",") + "\n";
      // const csvBody = sortedTransactions.map(v => (tableHeaders.map(t => v[t.val])).join(',')).join('\n')
      const res = await getTransactionsAPI(props?.walletId);
      const csvBody = res?.body?.transactionData
        ?.map((v) => tableHeaders.map((t) => v[t.val]).join(","))
        .join("\n");
      const csv = document.createElement("a");
      csv.href =
        "data:text/csv;charset=utf-8," + encodeURI(csvHeaders + csvBody);
      csv.target = "_blank";
      csv.download = `${props?.walletId}-transactions.csv`;
      csv.click();
    } catch (error) {
      console.log("Error while downloading CSV: ", error);
    }
  };

  return (
    <div className="transactions">
      <h2>{props?.showTransactions ? "Transactions" : "Make Transactions"}</h2>
      <div className="wallet-name-balance">
        <label>
          <b>Wallet Name: </b>
          {props.walletName}
        </label>
        <label>
          <b>Balance: </b>
          {props.balance}
        </label>
        <div className="links">
          {
            <a href="#" onClick={(e) => onLinkClick(e)}>
              {props?.showTransactions
                ? "Click To Make Transactions"
                : "Click To See Transactions"}
            </a>
          }
          {props?.showTransactions && (
            <button onClick={downloadCSV}>Download CSV</button>
          )}
        </div>
        <br></br>
      </div>
      {!props?.showTransactions ? (
        <div>
          <form onSubmit={onTransationClick}>
            <label>Amount </label>
            <input
              type="number"
              pattern="[0-9]"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder="Enter Value"
              required
              min="1"
            ></input>
            <label>Description </label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              value={description}
            />
            <div className="transaction-type">
              <div className="type">
                <input
                  type="checkbox"
                  onChange={(e) => setToggle(false)}
                  checked={!toggle}
                ></input>
                <label>DEBIT</label>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  onChange={(e) => setToggle(true)}
                  checked={toggle}
                ></input>
                <label>CREDIT</label>
              </div>
            </div>
            <input type="submit" value="submit"></input>
          </form>
        </div>
      ) : (
        <TransactionTableComponent walletId={props?.walletId} />
      )}
    </div>
  );
};

export default DetailsComponent;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import CreateWalletComponent from "./CreateWalletComponent/CreateWalletComponent";
import DetailsComponent from "./detailsComponent/detailsComponent";
import { getWalletDetailsAPI } from "./https/service";

import "./index.css";

const Home = () => {
  const [walletId, setWalletId] = useState(null);
  const [walletName, setWalletName] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    try {
      const lSWalletID = localStorage.getItem("id");
      const getWalletDetails = async () => {
        const res = await getWalletDetailsAPI(lSWalletID);
        setWalletId(res?.body?.[0]?.wallet_id);
        setWalletName(res?.body?.[0]?.name);
        setWalletBalance(res?.body?.[0]?.balance);
      };
      if (lSWalletID) {
        getWalletDetails();
      }
    } catch (error) {
      console.log("Error while getting wallet details: ", error);
    }
  }, []);

  return (
    <div className="home">
      {walletId ? (
        <div
          className="wallet-details"
          style={{ width: showTransactions ? "1200px" : "350px" }}
        >
          <DetailsComponent
            walletName={walletName}
            balance={walletBalance}
            walletId={walletId}
            setBalance={setWalletBalance}
            setShowTransactions={setShowTransactions}
            showTransactions={showTransactions}
          />
        </div>
      ) : (
        <div className="create-wallet">
          <CreateWalletComponent
            setWalletId={setWalletId}
            setWalletName={setWalletName}
            setWalletBalance={setWalletBalance}
          />
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Home />);

import React, { useState } from "react";
import { createWalletAPI } from "../https/service";

const CreateWalletComponent = (props) => {
  const [walletName, setWalletName] = useState("");
  const [balance, setBalance] = useState(0);

  const updateFormData = async (event) => {
    try {
      event.preventDefault();
      const res = await createWalletAPI(walletName, balance);
      const resBody = res?.body;
      if (!!resBody?.id) {
        const resBody = res?.body;
        localStorage.setItem("id", resBody?.id);
        props.setWalletId(resBody?.id);
        props.setWalletName(resBody?.name);
        props.setWalletBalance(resBody?.balance);
      }
    } catch (error) {
      console.log("Error while creating wallet: ", error);
    }
  };

  return (
    <div className="create-wallet-form">
      <h2>Create Wallet</h2>
      <form onSubmit={updateFormData}>
        <label>Enter Wallet Name </label>
        <input
          type="text"
          onChange={(e) => setWalletName(e.target.value)}
          required
          placeholder="Enter Wallet Name"
        ></input>
        <label>Initial Amount </label>
        <input
          type="number"
          min="0"
          pattern="[0-9]"
          onChange={(e) => setBalance(+e.target.value)}
          placeholder="Enter Initial Amount"
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default CreateWalletComponent;

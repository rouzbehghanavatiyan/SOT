import React, { useState } from "react";
import { Button } from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RsetMessageModal } from "../../common/Slices/main";
import { createPayment } from "../../services/nest";

type Cryptocurrency = "BTC" | "ETH" | "USDT" | "USDC" | "LTC";
type NetworkType = "TRX" | "ETH" | "USDT" | "BSC";

const Pay: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.main.userLogin.user);
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency>("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>("TRX");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const postData = {
        userId: user.id,
        crypto: selectedCrypto,
        network: selectedNetwork,
        amount,
      };
      const res = await createPayment(postData);
      const { data, status } = res?.data;

      if (status === 0) {
        dispatch(
          RsetMessageModal({
            title: "Payment request created successfully!",
            show: true,
            icon: "success",
          })
        );
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      console.error("Error creating payment request:", err);
      setError("Unable to create payment request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800">Crypto Deposit</h2>
      <div className="mb-4">
        <label className="block text-gray-800 text-sm font-medium mb-2">
          Amount to Deposit
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount (e.g., 100 USDT)"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-sm font-medium mb-2">
          Select Cryptocurrency
        </label>
        <select
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value as Cryptocurrency)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="USDT">Tether (USDT)</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="USDC">USD Coin (USDC)</option>
          <option value="LTC">Litecoin (LTC)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-sm font-medium mb-2">
          Select Network
        </label>
        <select
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value as NetworkType)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="TRX">TRC20 (TRX)</option>
          <option value="ETH">ERC20 (ETH)</option>
          <option value="BSC">BEP20 (BSC)</option>
        </select>
      </div>
      {error && <div className="text-red text-sm mb-4">*{error}</div>}
      <Button
        label="Create Payment Request"
        onClick={handlePayment}
        loading={isLoading}
        className="w-full"
      />
    </div>
  );
};

export default Pay;

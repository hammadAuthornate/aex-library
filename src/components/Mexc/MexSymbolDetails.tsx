import { FC, useEffect, useState } from "react";
import axios from "axios";

interface SymbolDetails {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  orderTypes?: string[];
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  maxQuoteAmount: string;
  makerCommission: string;
  takerCommission: string;
}

const MexSymbolDetails: FC<{ selectedSymbol: string }> = ({
  selectedSymbol,
}) => {
  const [symbolDetails, setSymbolDetails] = useState<SymbolDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const baseUrl = "http://localhost:5000";
  useEffect(() => {
    const fetchSymbolDetails = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axios.get(
          `${baseUrl}/api/exchangeInfo?symbol=${selectedSymbol}`
        );
        setSymbolDetails(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching symbol details:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSymbolDetails();
  }, [selectedSymbol]);

  if (isLoading) return <div>Loading details...</div>;
  if (isError) return <div>Error fetching details for {selectedSymbol}.</div>;
  if (!symbolDetails)
    return <div>No details available for {selectedSymbol}.</div>;

  return (
    <div>
      <h2>{symbolDetails.symbol} Details</h2>
      <p>
        <strong>Status:</strong> {symbolDetails.status}
      </p>
      <p>
        <strong>Base Asset:</strong> {symbolDetails.baseAsset} (Precision:{" "}
        {symbolDetails.baseAssetPrecision})
      </p>
      <p>
        <strong>Quote Asset:</strong> {symbolDetails.quoteAsset} (Precision:{" "}
        {symbolDetails.quotePrecision})
      </p>
      <p>
        <strong>Order Types:</strong>{" "}
        {symbolDetails.orderTypes && symbolDetails.orderTypes.length > 0
          ? symbolDetails.orderTypes.join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Spot Trading Allowed:</strong>{" "}
        {symbolDetails.isSpotTradingAllowed ? "Yes" : "No"}
      </p>
      <p>
        <strong>Margin Trading Allowed:</strong>{" "}
        {symbolDetails.isMarginTradingAllowed ? "Yes" : "No"}
      </p>
      <p>
        <strong>Max Quote Amount:</strong> {symbolDetails.maxQuoteAmount}
      </p>
      <p>
        <strong>Maker Commission:</strong> {symbolDetails.makerCommission}
      </p>
      <p>
        <strong>Taker Commission:</strong> {symbolDetails.takerCommission}
      </p>
    </div>
  );
};

export default MexSymbolDetails;

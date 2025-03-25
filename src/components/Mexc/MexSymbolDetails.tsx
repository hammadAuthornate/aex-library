import { FC, useEffect, useState } from "react";
import axios from "axios";

interface SymbolDetails {
  [key: string]: any; 
}

const MexSymbolDetails: FC<{ selectedSymbol: string }> = ({
  selectedSymbol,
}) => {
  const [symbolDetails, setSymbolDetails] = useState<SymbolDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchSymbolDetails = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axios.get(`${baseUrl}/mexc/exchangeInfo`, {
          params: {
            symbol: selectedSymbol,
          },
        });
        setSymbolDetails(response.data);
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
      <table
        border={1}
        cellPadding="5"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <tbody>
          {Object.entries(symbolDetails).map(([key, value]) => (
            <tr key={key}>
              <td>
                <strong>{key}</strong>
              </td>
              <td>
                {Array.isArray(value) ? value.join(", ") : value?.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MexSymbolDetails;

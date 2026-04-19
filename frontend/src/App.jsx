import { useEffect, useState } from "react";
import "./App.css"; 

function App() {
  const [coin, setCoin] = useState("bitcoin");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleRefresh = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://crypto-trading-app-gdau.onrender.com/signal?coin=${coin}`
      );
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [coin]);

  return (
    <div className="crypto-center-wrapper">
      <h1 className="crypto-title">Crypto Dashboard</h1>

      <center>
        <div className="crypto-card">
          <label className="crypto-label">Select asset</label>

          <select
            className="crypto-select"
            onChange={(e) => setCoin(e.target.value)}
            value={coin}
          >
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
          </select>

          <div className="crypto-row">
            <div className="crypto-box">
              <div className="crypto-box-label">LATEST PRICE</div>
              {loading ? (
                <div className="crypto-price">...</div>
              ) : (
                <div className="crypto-price">
                  {data && data.price ? `$${data.price}` : "-"}
                </div>
              )}
            </div>

            <div className="crypto-box">
              <div className="crypto-box-label">SIGNAL</div>
              {loading ? (
                <div className="crypto-signal">...</div>
              ) : (
                <div
                  className={`crypto-signal ${
                    data.signal === "SELL" ? "sell" : ""
                  }`}
                >
                  {data.signal || "-"}
                </div>
              )}
            </div>
          </div>

          <button
            className="crypto-refresh"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh Now"}
          </button>
        </div>
      </center>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface RawData {
  id: number;
  cost: number;
  date: string;
}

function App() {
  const [data, setData] = useState<RawData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://engineering-task.elancoapps.com/api/raw');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Calculate highest costs
  const highestCosts = data.length > 0 ? data.reduce((max, curr) => (curr.cost > max ? curr.cost : max), data[0].cost) : 0;

  return (
    <div className="container">
      <h1 className="heading">Data Display Tool</h1>
      {data.length > 0 ? (
        <div>
          <h2 className="highest-costs">Highest Costs: {highestCosts}</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cost</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.cost}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="loading">Loading data...</p>
      )}
    </div>
  );
}

export default App;

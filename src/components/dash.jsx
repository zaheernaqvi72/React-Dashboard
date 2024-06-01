import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import data from '../data/data.json';

const Dashboard = () => {
  const [alertData, setAlertData] = useState([]);

  useEffect(() => {
    // Parse and process the JSON data
    const processedData = data.map(alert => ({
      timestamp: alert.timestamp,
      flow_id: alert.flow_id,
      src_ip: alert.src_ip,
      dest_ip: alert.dest_ip,
      severity: alert.alert ? alert.alert.severity : null, // Add null check
      category: alert.alert ? alert.alert.category : null, // Add null check
    }));
    setAlertData(processedData);
  }, []);

  const timestamps = alertData.map(d => d.timestamp);
  const severities = alertData.map(d => d.severity);
  const categories = alertData.map(d => d.category);

  const severityCounts = severities.reduce((acc, severity) => {
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {});

  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <Plot
        data={[
          {
            x: timestamps,
            y: severities,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{
          title: 'Severity Over Time',
          plot_bgcolor: '#1e1e1e',
          paper_bgcolor: '#1e1e1e',
          font: { color: '#ffffff' },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
      <Plot
        data={[
          {
            x: Object.keys(severityCounts),
            y: Object.values(severityCounts),
            type: 'bar',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          title: 'Alert Severity Count',
          plot_bgcolor: '#1e1e1e',
          paper_bgcolor: '#1e1e1e',
          font: { color: '#ffffff' },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
      <Plot
        data={[
          {
            labels: Object.keys(categoryCounts),
            values: Object.values(categoryCounts),
            type: 'pie',
          },
        ]}
        layout={{
          title: 'Alert Category Distribution',
          plot_bgcolor: '#1e1e1e',
          paper_bgcolor: '#1e1e1e',
          font: { color: '#ffffff' },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Dashboard;

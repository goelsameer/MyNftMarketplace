import { useEffect, useState } from 'react';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOTgxNjk2MS1lMzgzLTQxZTMtOTA0NS1iZmZjZTkxNWI4MGUiLCJlbWFpbCI6InNhbWVlcmdvZWxtYWlsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3N2Q3NmI4NWRmYTQ4NGU1YjlkZSIsInNjb3BlZEtleVNlY3JldCI6ImU5ZjNmNGMxMDMyZTk3NDUzY2E0NzYyZjNkMmNiZGE2MzY5MzIyZTZkNDhlYmVlMTQwMjIyNGI3OGVmOTY4MTQiLCJleHAiOjE3NTcwNzY1MjV9.S6VX64l6L2pZI3ZWIz6wM2F6fv2fUNrVgwH6sPRABOY";

const ApiData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromIPFS = async () => {
      try {
        const response = await fetch(`https://gateway.pinata.cloud/ipfs/bafkreihj5w5cpsbfzwt5ydmhn4auaxkt3wwy3kdxcvaydqqbbo3hzx77c4`);
        if (response.ok) {
          const result = await response;
          setData(result);
          console.log(result);  // Inspect the data here
        } else {
          console.error('Failed to fetch from IPFS:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data from IPFS:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromIPFS();
  }, []);  // Empty dependency array means this runs once on mount

  return (
    <div>
      <img src="https://gateway.pinata.cloud/ipfs/bafkreihj5w5cpsbfzwt5ydmhn4auaxkt3wwy3kdxcvaydqqbbo3hzx77c4"/>
      {loading ? (
        <p>Loading data from IPFS...</p>
      ) : data ? (
        <div>
          <h1>IPFS Data:</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default ApiData;

/*
bafkreihj5w5cpsbfzwt5ydmhn4auaxkt3wwy3kdxcvaydqqbbo3hzx77c4
 */
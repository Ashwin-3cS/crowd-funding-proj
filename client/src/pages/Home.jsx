// import React, { useEffect, useState } from 'react';
// import { useStateContext } from '../context';
// import { DisplayCampaigns } from '../components';

// const Home = () => {
//   const { getCampaigns, address, contract, signer } = useStateContext();
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchCampaigns = async () => {
//     if (!contract || !signer) return;
//     console.log("Fetching campaigns");
//     setLoading(true);
//     try {
//       const campaignsData = await getCampaigns();
//       console.log("Campaigns data received:", campaignsData);
//       setCampaigns(campaignsData || []);
//     } catch (error) {
//       console.error("Error fetching campaigns:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCampaigns();
//   }, [address, contract, signer]);

//   return (
//     <DisplayCampaigns
//       title="All Campaigns"
//       isLoading={loading}
//       campaigns={campaigns}
//     />
//   );
// };

// export default Home;







import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';
import { toast, Toaster } from 'react-hot-toast'; // Example library for notifications

const Home = () => {
  const { getCampaigns, address } = useStateContext();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const campaignsData = await getCampaigns();
      console.log("Campaigns data received:", campaignsData);
      setCampaigns(campaignsData || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={loading}
        campaigns={campaigns}
      />
      <Toaster />
    </div>
  );
};

export default Home;

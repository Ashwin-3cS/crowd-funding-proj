import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const Profile = () => {
  const { getUserCampaigns, address } = useStateContext();
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserCampaigns = async () => {
    if (!address) return;
    console.log("Fetching user's campaigns");
    setLoading(true);
    try {
      const campaigns = await getUserCampaigns();
      console.log("User's campaigns received:", campaigns);
      setUserCampaigns(campaigns || []);
    } catch (error) {
      console.error("Error fetching user's campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCampaigns();
  }, [address]);

  return (
    <div>
      {!address ? (
        <div>
          <p>Please connect your wallet to see your campaigns.</p>
        </div>
      ) : (
        <DisplayCampaigns
          title="Your Campaigns"
          isLoading={loading}
          campaigns={userCampaigns}
        />
      )}
    </div>
  );
};

export default Profile;

// import React, { useContext, createContext } from 'react';
// import { ethers } from 'ethers';
// import { useAccount, useProvider, useSigner } from 'wagmi';
// import contractAbi from "../utils/contractAbi.json";

// const StateContext = createContext();

// const contractAddress = "0x3Eea673D48a33e8d068AF87112facACa0dCeb4e4";
// const contractABI = contractAbi;

// export const StateContextProvider = ({ children }) => {
//   const { address } = useAccount();
//   const provider = useProvider();
//   const { data: signer } = useSigner();

//   const publishCampaign = async (form) => {
//     if (!signer) {
//       console.log("Wallet not connected");
//       return;
//     }

//     try {
//       const contract = new ethers.Contract(contractAddress, contractABI, signer);
//       const targetInEther = ethers.utils.parseUnits(form.target.toString(), "ether");
//       const deadlineInUnix = Math.floor(new Date(form.deadline).getTime() / 1000);
//       const data = await contract.createCampaign(
//         address,
//         form.title,
//         form.description,
//         targetInEther,
//         deadlineInUnix,
//         form.image
//       );

//       console.log("Contract call success", data);
//     } catch (error) {
//       console.log("Contract call failure", error);
//     }
//   };

//   const getEveryCreatedCampaigns = async () => {
//     if (!signer) {
//       console.log("Signer not available");
//       return [];
//     }

//     try {
//       console.log("in the function");
//       const contract = new ethers.Contract(contractAddress, contractABI, signer);
//       const campaigns = await contract.getCampaigns();

//       const parsedCampaigns = campaigns.map((campaign, i) => ({
//         owner: campaign.owner,
//         title: campaign.title,
//         description: campaign.description,
//         target: ethers.utils.formatEther(campaign.target.toString()),
//         deadline: campaign.deadline.toNumber(),
//         amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
//         image: campaign.image,
//         pId: i
//       }));

//       console.log("Campaigns fetched successfully", parsedCampaigns);
//       return parsedCampaigns;
//     } catch (error) {
//       console.log("Failed to fetch campaigns", error);
//       return [];
//     }
//   };

//   const getUserCampaigns = async () => {
//     try {
//       const allCampaigns = await getEveryCreatedCampaigns();
//       if (!allCampaigns) {
//         return [];
//       }
//       const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
//       return filteredCampaigns;
//     } catch (error) {
//       console.error("Error fetching user campaigns:", error);
//       return [];
//     }
//   };

//   return (
//     <StateContext.Provider 
//       value={{
//         address,
//         createCampaign: publishCampaign,
//         contract: contractAddress,
//         getCampaigns: getEveryCreatedCampaigns,
//         getUserCampaigns,
//         signer, // Expose signer if needed elsewhere
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);

// the below part is reference 
//   const getCampaigns = async () => {
//     const campaigns = await contract.call('getCampaigns');

//     const parsedCampaings = campaigns.map((campaign, i) => ({
//       owner: campaign.owner,
//       title: campaign.title,
//       description: campaign.description,
//       target: ethers.utils.formatEther(campaign.target.toString()),
//       deadline: campaign.deadline.toNumber(),
//       amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
//       image: campaign.image,
//       pId: i
//     }));

//     return parsedCampaings;
//   }

//   const getUserCampaigns = async () => {
//     const allCampaigns = await getCampaigns();

//     const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

//     return filteredCampaigns;
//   }

//   const donate = async (pId, amount) => {
//     const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

//     return data;
//   }

//   const getDonations = async (pId) => {
//     const donations = await contract.call('getDonators', [pId]);
//     const numberOfDonations = donations[0].length;

//     const parsedDonations = [];

//     for(let i = 0; i < numberOfDonations; i++) {
//       parsedDonations.push({
//         donator: donations[0][i],
//         donation: ethers.utils.formatEther(donations[1][i].toString())
//       })
//     }

//     return parsedDonations;
//   }










import React, { useContext, createContext } from 'react';
import { ethers } from 'ethers';
import { useAccount, useProvider, useSigner } from 'wagmi';
import contractAbi from "../utils/contractAbi.json";

const StateContext = createContext();

const contractAddress = "0x3Eea673D48a33e8d068AF87112facACa0dCeb4e4";
const contractABI = contractAbi;

const readOnlyProvider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/4066181504164da3a9bd66e624cf82ac');

export const StateContextProvider = ({ children }) => {
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const publishCampaign = async (form) => {
    if (!signer) {
      console.log("Wallet not connected");
      // Trigger a toast notification or similar UI feedback
      return;
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const targetInEther = ethers.utils.parseUnits(form.target.toString(), "ether");
      const deadlineInUnix = Math.floor(new Date(form.deadline).getTime() / 1000);
      const data = await contract.createCampaign(
        address,
        form.title,
        form.description,
        targetInEther,
        deadlineInUnix,
        form.image
      );

      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failure", error);
    }
  };

  const getEveryCreatedCampaigns = async () => {
    try {
      console.log('Fetching campaigns');
      const contract = new ethers.Contract(contractAddress, contractABI, readOnlyProvider);
      const campaigns = await contract.getCampaigns();

      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i
      }));

      console.log("Campaigns fetched successfully", parsedCampaigns);
      return parsedCampaigns;
    } catch (error) {
      console.log("Failed to fetch campaigns", error);
      return [];
    }
  };


  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getEveryCreatedCampaigns();
      if (!allCampaigns) {
        return [];
      }
      const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
      return filteredCampaigns;
    } catch (error) {
      console.error("Error fetching user campaigns:", error);
      return [];
    }
  };

  return (
    <StateContext.Provider 
      value={{
        address,
        createCampaign: publishCampaign,
        contract: contractAddress,
        getCampaigns: getEveryCreatedCampaigns,
        getUserCampaigns
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);





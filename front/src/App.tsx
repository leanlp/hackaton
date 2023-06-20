import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SaveContract from "./pages/SaveContract";

import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli, polygonMumbai } from "wagmi/chains";
import RegisterUsers from "./pages/RegisterUsers";
import RegisterHouse from "./pages/RegisterHouse";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
const chains = [polygonMumbai];
// const chains = [arbitrum, mainnet, polygon, goerli, polygonMumbai];
const projectId = import.meta.env.VITE_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 1, chains }),
	provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {

	const [showSidebar,setShowSidebar] = useState<boolean>(true);

	const handleToggleSideBar = () => {
	//togglesidebar with useState
	setShowSidebar(!showSidebar);
	}

	return (
		<WagmiConfig client={wagmiClient}>
		{showSidebar &&  <Sidebar />}
			<Routes>
				<Route path="/" element={<Home toggleSideBar={()=>handleToggleSideBar() } />} />
				<Route path="/register" element={<Register />} />
				<Route path="/save" element={<SaveContract />} />
				<Route path="/profile" element={<Profile/>} />
				<Route path="/RegisterUsers" element={<RegisterUsers />} />
				<Route path="/RegisterHouse" element={<RegisterHouse />} />
			</Routes>
			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
			
		</WagmiConfig>
	);
}

export default App;
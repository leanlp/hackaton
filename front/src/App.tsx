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

const chains = [arbitrum, mainnet, polygon, goerli, polygonMumbai];
const projectId = import.meta.env.VITE_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 1, chains }),
	provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
	return (
		<WagmiConfig client={wagmiClient}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/save" element={<SaveContract />} />
			</Routes>
			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		</WagmiConfig>
	);
}

export default App;

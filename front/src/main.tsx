import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient( {
	uri: 'http://127.0.0.1:8080/graphql',
	cache: new InMemoryCache(),
} );


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
			<App />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>
);

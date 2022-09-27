import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import client from "./services/apolloClient";
import { RecoilRoot } from "recoil";
import {ApolloProvider} from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>
);

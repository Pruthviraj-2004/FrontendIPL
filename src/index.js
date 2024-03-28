import React from 'react';
import { HashRouter } from "react-router-dom";

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import ScrollToTopOnPageChange from "./ScrollToTop";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
  <HashRouter basename='/'>
    <ScrollToTopOnPageChange/>
    <App />
    </HashRouter>
  </QueryClientProvider>
</Provider>
);



import React from "react";
import ReactDOM from "react-dom";
// import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import App from "./App";

// const App = () => (
//   <h1>My React and TypeScript App hello!</h1>
// );

ReactDOM.render(
  <AppProvider i18n={enTranslations}>
    <App/>
  </AppProvider>,
  document.getElementById("root")
);
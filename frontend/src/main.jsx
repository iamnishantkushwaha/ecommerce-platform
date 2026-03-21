import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import {Provider} from "react-redux"
import { store } from "./Redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store} >
       <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyledEngineProvider>
    </Provider>
   
  </StrictMode>
);
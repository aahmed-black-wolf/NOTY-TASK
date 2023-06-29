import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { ContextState } from "./context/ContextState";

import { RouterCom } from "./routes/RouterCom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ContextState>
    <RouterCom />
  </ContextState>
);

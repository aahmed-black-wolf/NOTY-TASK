import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/main.css";
import { ContextState } from "./context/ContextState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterCom } from "./routes/RouterCom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ContextState>
    <RouterCom />
    <ToastContainer />
  </ContextState>
);

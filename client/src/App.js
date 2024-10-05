import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/index";
import UserContext from "./ContextProvider/AuthContext";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UserContext>
  );
}

export default App;

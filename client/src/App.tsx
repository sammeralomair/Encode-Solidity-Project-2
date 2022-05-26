import React from "react";
import { EthereumProvider } from "./Utils/EthersUtils";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const CreateBallot = React.lazy(() => import("./CreateBallot/CreateBallot"));
const ViewBallot = React.lazy(() => import("./ViewBallot/ViewBallot"));

function App() {
  return (
  <EthereumProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateBallot />} />
        <Route path="/ballot/:ballotAddress" element={<ViewBallot />} />
      </Routes>
    </BrowserRouter>
  </EthereumProvider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Contacts from "./pages/Contacts";
import Sos from "./pages/Sos";
import Monitoring from "./pages/Monitoring";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/sos" element={<Sos />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
};

export default App;
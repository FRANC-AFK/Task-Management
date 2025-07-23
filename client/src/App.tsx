import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UserDashboard from "./pages/user/UserDashboard";
import { SidebarProvider } from "./contexts/useSidebarContext";

function App() {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </SidebarProvider>
  );
}

export default App;

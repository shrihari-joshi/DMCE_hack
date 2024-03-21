import { Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import LoginForm from "./Component/Login/login";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<LobbyScreen />} /> */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;

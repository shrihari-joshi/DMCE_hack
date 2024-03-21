import { Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import RegisterForm from "./register"
import LoginForm from "./login"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/register" element={<RegisterForm/>}/>
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import RegisterForm from "./Component/Register/register"
import LoginForm from "./Component/Login/login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/" element={<LoginForm/>}/>
        {/* <Route path="/register" element={<RegisterForm/>}/> */}
        {/* <Route path="/login" element={<LoginForm/>}/> */}
      </Routes>
    </div>
  );
}

export default App;

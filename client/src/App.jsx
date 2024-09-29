import { Routes, Route } from "react-router-dom";
import Lobby from "./screens/Lobby";
import RoomPage from "./screens/Room";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Lobby />}></Route>
        <Route path="/room/:roomId" element={<RoomPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

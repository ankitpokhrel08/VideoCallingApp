import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");

  const socket = useSocket();

  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("join-room", { room, email });
    },
    [room, email, socket]
  );

  const handleJoinRoom = useCallback(
    ({ room }) => {
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("join-room", handleJoinRoom);
    return () => {
      socket.off("join-room", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Lobby</h1>
      <h1 className="text-3xl font-bold underline">Lobby</h1>
      <h1 className="text-3xl font-bold underline">Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="room">Room ID</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <br />
        <button> JOIN </button>
      </form>
    </div>
  );
}

export default Lobby;

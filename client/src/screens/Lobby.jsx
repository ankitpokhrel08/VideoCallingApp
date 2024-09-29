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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold underline mb-10 mt-10">Lobby</h1>

      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email ID
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <br />
        <br />
        <label htmlFor="room" className="block text-gray-700 font-medium mb-2">
          Room ID
        </label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <br />
        <br />
        <button className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-600">
          {" "}
          JOIN{" "}
        </button>
      </form>
    </div>
  );
}

export default Lobby;

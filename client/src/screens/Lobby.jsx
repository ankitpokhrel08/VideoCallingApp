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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm m-auto mt-20 p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">
            LOBBY
          </h1>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Email ID
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required=""
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="room"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              ROOM ID
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {" "}
            JOIN{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Lobby;

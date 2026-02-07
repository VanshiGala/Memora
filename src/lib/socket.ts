// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;

// export const getSocket = async (): Promise<Socket> => {
//   if (!socket) {
//     // await fetch("/api/socket");
//     // socket = io({ path: "/api/socket" });
//     socket = io({
//   path: "/api/socket",
//   transports: ["websocket"],
// });

//   }
//   return socket;
// };


import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = async (): Promise<Socket> => {
  if (!socket) {
    await fetch("/api/socket"); // triggers server init

    socket = io({
      path: "/api/socket",
      transports: ["websocket"], // important!
    });
  }

  return socket;
};

// import { useEffect } from "react";
// import { useAppSelector } from "./hook";

// export const useSocket: React.FC<any> = (eventName, callback) => {
//   const socket = useAppSelector((state: any) => state.main.socketConfig);

//   useEffect(() => {
//     if (!socket) return;

//     socket.on(eventName, callback);

//     return () => {
//       socket.off(eventName, callback);
//     };
//   }, [socket, eventName, callback]);

// };

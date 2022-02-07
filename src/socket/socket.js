import io from "socket.io";
import { getMessages, postMessage } from "../controllers/message";
import { getProducts } from "../controllers/product";
import { myServer } from "../server/server";

class SocketIO {
  //Conexion Websocket
  init() {
    const ioServer = io(myServer);
    ioServer.on("connection", (socket) => {
      console.log("Se conecto un cliente");

      //Envio de lista de productos a todos los usuarios
      const products = getProducts().then((data) => {
        ioServer.emit("products", data);
      });

      //Envio de todos los mensajes a todos los usuarios
      const messages = getMessages().then((data) => {
        ioServer.emit("message", data);
      });

      //Conexion con chat
      socket.on("chatMessage", (chat) => {
        postMessage(chat);
        //Envio del chat a los usuarios
        getMessages().then((data) => {
          socket.emit("message", data);
          socket.broadcast.emit("message", data);
        });
      });
    });
  }
}
export const socketIO = new SocketIO();

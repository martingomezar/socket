const socketIO = io.connect("http://localhost:8080", { forceNew: true });
const emailpropio = "magakaefe@hotmail.com";

//Recibo productos desde el servidor
socketIO.on("products", (productos) => {
  const html = productos
    .map((producto) => {
      return `<div>
                 <strong>${producto.title}</strong>
                 <h3>$ ${producto.price}</h3>
                 <img class="productImage" src=${producto.thumbnail} width=50 heigth=50>
              </div>`;
    })
    .join(" ");
  document.getElementById("list").innerHTML = html;
});

//Recibo mensajes de chat desde el servidor
socketIO.on("message", (chat) => {
  const html = chat
    .map((mensaje) => {
      return `<div>
                 <div class="chatemail">${mensaje.email}</div>
                 <div class="chatmensaje">${mensaje.message}</div>
                 <div class="chatfecha">${mensaje.createat}</div>
              </div>`;
    })
    .join(" ");
  document.getElementById("chat").innerHTML = html;
});

//Capturar mensaje desde Chat en Index.html
const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let chat = {
    email: e.target.elements.email.value,
    message: e.target.elements.msg.value,
  };

  if (!msg) {
    return false;
  }

  // enviar chat al servidor
  socketIO.emit("chatMessage", chat);

  // borrar el input
  e.target.elements.msg.value = "";
  e.target.elements.email.value = "";
  e.target.elements.msg.focus();
});

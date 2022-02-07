import {myServer} from "./server/server";

const port = 8080;

myServer.listen(port, () => console.log(`Server up puerto ${port}`));

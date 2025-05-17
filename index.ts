import { wsServer } from "./src/ws-server";
import { httpServer } from "./src/http_server";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);

wsServer(WS_PORT);
console.log(`Start web socket server on the ${WS_PORT} port!`);

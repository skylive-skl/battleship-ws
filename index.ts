import { startWSServer } from "./src/server";
import { httpServer } from "./src/http_server";

import { config } from 'dotenv';

config();

const HTTP_PORT = process.env.HTTP_PORT || 8181;
const WEB_SOCKET_PORT: number = parseInt(process.env.WEB_SOCKET_PORT || "3000");


console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start static ws server on the ${WEB_SOCKET_PORT} port!`);
httpServer.listen(HTTP_PORT);
startWSServer(WEB_SOCKET_PORT);


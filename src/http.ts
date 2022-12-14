import express from 'express';
import http from 'http';
import { join } from 'path';
import { Server } from 'socket.io';

const app = express();

app.use(express.static(join(__dirname, "..", "public")));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

export { server, io }

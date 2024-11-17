import http from 'http'
import express from 'express'
import cors from 'cors'
import { Server, LobbyRoom } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { RoomType } from '../types/Rooms'
// import fs from 'fs'; // Import fs for reading certificate files

import { SkyOffice } from './rooms/SkyOffice'

const port = Number(process.env.PORT || 8080)
const app = express()

// app.use(cors({}));
app.use(cors({
  origin: '*'
}));

app.use(express.json())
// app.use(express.static('dist'))

const server = http.createServer(app)
const gameServer = new Server({
  server,
})

// register room handlers
gameServer.define(RoomType.LOBBY, LobbyRoom)
gameServer.define(RoomType.PUBLIC, SkyOffice, {
  name: 'Public Lobby',
  description: 'For making friends and familiarizing yourself with the controls',
  password: null,
  autoDispose: false,
})
gameServer.define(RoomType.CUSTOM, SkyOffice).enableRealtimeListing()

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use('/colyseus', monitor())

// 로컬호스트로 돌릴 시 코드
// gameServer.listen(port);
// console.log(`Listening on ws://localhost:${port}`);

gameServer.listen(port, '0.0.0.0');
console.log(`Listening on https://0.0.0.0:${port}`);
console.log(`Server accessible via https://13.124.171.11:${port}`);

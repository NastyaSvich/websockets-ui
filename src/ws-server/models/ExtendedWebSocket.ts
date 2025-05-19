import {WebSocket} from "ws";
import {User} from "./User";

export interface ExtendedWebSocket extends WebSocket {
    userIndex?: User["index"];
}

// При регистрации (type: "reg") — сохраняем пользователя:
//     ts
// Copy
// Edit
// case 'reg': {
//     const { name, password } = message.data;
//     const index = crypto.randomUUID(); // или автоинкремент, если нужно
//
//     (socket as ExtendedWebSocket).user = { name, index };
//
//     const response = {
//         type: 'reg',
//         data: { name, index, error: false, errorText: '' },
//         id: 0,
//     };
//     socket.send(JSON.stringify(response));
//     break;
// }
// 3. При create_room — создаем комнату и добавляем туда пользователя:
//     ts
// Copy
// Edit
// case 'create_room': {
//     const roomId = crypto.randomUUID();
//     const ws = socket as ExtendedWebSocket;
//     const user = ws.user;
//
//     if (!user) {
//         // Ошибка, если пользователь не авторизован
//         socket.send(JSON.stringify({
//             type: 'error',
//             data: 'User not registered',
//             id: message.id,
//         }));
//         break;
//     }
//
//     rooms[roomId] = {
//         users: [user],
//     };
//
//     broadcastUpdateRooms(); // обновляем список комнат для всех
//
//     break;
// }
// 💡 Дополнительно: broadcastUpdateRooms()
// Если ты ещё не сделал это, можешь реализовать функцию, которая отправляет всем клиентам текущее состояние комнат:
//
//     ts
// Copy
// Edit
// const broadcastUpdateRooms = () => {
//     const roomList = Object.entries(rooms)
//         .filter(([_, room]) => room.users.length === 1)
//         .map(([roomId, room]) => ({
//             roomId,
//             roomUsers: room.users,
//         }));
//
//     const updateMessage = {
//         type: 'update_room',
//         data: roomList,
//         id: 0,
//     };
//
//     server.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(updateMessage));
//         }
//     });
// };
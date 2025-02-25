import { IncomingMessage, ServerResponse } from 'http';
import { getTaskAll, addTask, getTaskActive, getTaskComplete, updateTask, deleteTask, deleteTaskComplete } from '../controllers/taskController';

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'GET' && req.url === '/taskAll') {
        getTaskAll(req, res);
    } else if (req.method === 'GET' && req.url === '/taskActive') {
        getTaskActive(req, res);
    } else if (req.method === 'GET' && req.url === '/taskComplete') {
        getTaskComplete(req, res);
    } else if (req.method === 'POST' && req.url === '/task') {
        addTask(req, res);
    } else if (req.method === "PUT" && req.url?.startsWith("/task/")) {
        const parts = req.url.split("/"); 
        const id: number = Number(parts[2]);
        updateTask(req, res, id);
    } else if (req.method === 'DELETE' && req.url?.startsWith("/task/")) {
        const parts = req.url.split("/"); 
        const id: number = Number(parts[2]);
        deleteTask(req, res, id);
    } else if (req.method === 'DELETE' && req.url === '/taskComplete') {
        deleteTaskComplete(req,res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
};
import { IncomingMessage, ServerResponse } from 'http';
import { tasks, Task, updateTasks } from '../models/taskModel';
import TaskSchema from '../validators/taskSchema';

export const getTaskAll = (req: IncomingMessage, res: ServerResponse) => {
    try { 
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const descTasks = tasks.sort((a, b) => b.id - a.id);
        res.end(JSON.stringify(descTasks));
        return;
    } catch (error){
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ha ocurrido un error en el getTaskAll'}));
        return;
     }
};

export const getTaskActive = (req: IncomingMessage, res: ServerResponse) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const activeTasks = tasks.filter(task => !task.completed);
        res.end(JSON.stringify(activeTasks));
        return;
    } catch (error){
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ha ocurrido un error en el getTaskActive'}));
        return;
     }
};

export const getTaskComplete = (req: IncomingMessage, res: ServerResponse) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const completedTasks = tasks.filter(task => task.completed);
        res.end(JSON.stringify(completedTasks));
        return;
    } catch (error){
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ha ocurrido un error en el getTaskComplete'}));
        return;
     }
};

export const addTask = (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
         try {
            let lastId = 0;
            const descTasks = tasks.sort((a, b) => b.id - a.id);

            if(descTasks.length > 0){
                lastId = descTasks[0].id;
            }else {
                lastId = 0;
            }
            
            const task: Task = TaskSchema.parse(JSON.parse(body)) as Task;
            const taskSequence = { ...task,  id: lastId + 1 };

            tasks.push(taskSequence);
            console.log(tasks);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(taskSequence));
            return;
         } catch (error){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ha ocurrido un error en el addTask'}));
            return;
         }
    });
};

export const updateTask = (req: IncomingMessage, res: ServerResponse, id : number) => {
    console.log("el id es : " + id)

    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
         try {
             const activeTasks = tasks.filter(task => task.id == id);
             const taskId = activeTasks[0];

             if (activeTasks.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No se encontró la tarea'}));
                return;
              }

            let change = false;
              if (taskId.completed == false) {
                change = true;
            } 

             const taskSequence = { ...taskId,  completed: change };

             updateTasks(tasks.map(task => (task.id === id ? taskSequence : task)));
   
            console.log(tasks);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(taskSequence)); 
            return;
         }catch (error){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ha ocurrido un error en el updateTask'}));
            return;
         }
    });
};

export const deleteTask = (req: IncomingMessage, res: ServerResponse, id: number) => {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
         try {
             const activeTasks = tasks.filter(task => task.id == id);

            if (activeTasks.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No se encontró la tarea'}));
                return;
             }

            const updatedTasks = tasks.filter(task => task.id !== id);
            updateTasks(updatedTasks);

            console.log(tasks);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message : "Tarea borrada con exito"}));
            return;
         }catch (error){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ha ocurrido un error en el deleteTask'}));
            return;
         }
    });
};

export const deleteTaskComplete = (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
         try {
            const updatedTasks = tasks.filter(task => !task.completed);
            updateTasks(updatedTasks);
            
            console.log(tasks);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message : "Tareas borradas : " + updatedTasks.length}));
            return;
         } catch (error){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ha ocurrido un error en el deleteTaskComplete'}));
            return;
         }
    });
};

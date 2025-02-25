export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export let tasks: Task[] = [];

export function updateTasks(newTasks: Task[]) {
    tasks = newTasks; 
}
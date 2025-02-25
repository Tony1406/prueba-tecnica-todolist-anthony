import { z } from "zod";

const TaskSchema = z.object({
    id: z.number(),
    title: z.string(),
    completed: z.boolean()
});

export default TaskSchema;
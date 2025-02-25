export const getTask = async () => {
    const response = await fetch("http://localhost:3000/taskAll");
    const data = await response.json();
    console.log(data)
    return data;
  };
  
  export const filterTaskActive= async () => {
    const response = await fetch(`http://localhost:3000/taskActive`);
    const data = await response.json();
    return data;
  };

  export const filterTaskComplete= async () => {
    const response = await fetch(`http://localhost:3000/taskComplete`);
    const data = await response.json();
    return data;
  };
  
  export const registerTask = async (task: string) => {
    console.log(task);
    const response = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        title: task,
        completed: false
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  };
  
  export const deleteTask = async (id: number) => {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
      method: "DELETE",
    });
  
    return response.json();
  };

  export const deleteTaskComplete = async () => {
    const response = await fetch(`http://localhost:3000/taskComplete`, {
      method: "DELETE",
    });
  
    return response.json();
  };

  export const updateTask= async (id: number) => {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
      method: "PUT",
    });

    return response.json();
  };

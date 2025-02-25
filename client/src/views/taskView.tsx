import { useEffect, useState } from "react";
import "../styles/taskView.css";
import {
  deleteTask,
  deleteTaskComplete,
  filterTaskActive,
  filterTaskComplete,
  getTask,
  registerTask,
  updateTask,
} from "../services/taskServices";

const TaskView: React.FC = () => {
  const [task, setTask] = useState<
    { id: number; title: string; completed: boolean }[]
  >([]);
  const [taskInput, setTaskInput] = useState<string>("");

  const inputTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.target.value);
    console.log(event);
  };

  const handleSendTask = () => {
    if (taskInput == null || taskInput == "") {
      return;
    }

    registerTask(taskInput).then(() => {
      getTask().then((data) => setTask(data));
      setTaskInput("");
    });
    console.log("Tarea enviada", taskInput);
  };

  const handleDelete = (id: number): void => {
    deleteTask(id).then(() => {
      getTask().then((data) => setTask(data));
    });
    console.log("Tarea eliminada");
  };

  const handleUpdate = (id: number): void => {
    updateTask(id).then(() => {
      getTask().then((data) => setTask(data));
    });
    console.log("Tarea actualizada");
  };

  const handleFilterActive = (): void => {
    filterTaskActive().then((data) => {
      console.log(data);
      setTask(data);
    });
  };

  const handleFilterComplete = (): void => {
    filterTaskComplete().then((data) => {
      console.log(data);
      setTask(data);
    });
  };

  const handleFilterAll = (): void => {
    getTask().then((data) => {
      console.log(data);
      setTask(data);
    });
  };

  const handleClearComplete = (): void => {
    deleteTaskComplete().then(() => {
      getTask().then((data) => setTask(data));
    });
  };

  useEffect(() => {
    getTask().then((data) => {
      console.log(data);
      setTask(data);
    });
  }, []);
  return (
    <>
      <img className="imgFondoGrande" src="/bg-desktop-dark.jpg" alt="" />
      <img className="imgFondoPequeño" src="/bg-mobile-dark.jpg" alt="" />
      <div className="container">
        <div className="titulo">
          <h1>TODO</h1>
          <button>
            <img src="/icon-sun.svg" alt="" className="sunMoon" />
          </button>
        </div>
        <input
          className="inputTask"
          type="text"
          placeholder="Write your task"
          value={taskInput}
          onChange={(e) => inputTask(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendTask();
            }
          }}
        />
        <div>
          <ul>
            {task.length > 0 ? (
              task.map((task) => (
                <li key={task.id}>
                  <input
                    className="checkButton"
                    type="checkbox"
                    checked={task.completed}
                    onClick={() => handleUpdate(task.id)}
                  />
                  <p className="task">{task.title}</p>
                  <button
                    className="xButton"
                    onClick={() => handleDelete(task.id)}
                  >
                    <img src="/icon-cross.svg" alt="" />
                  </button>
                </li>
              ))
            ) : (
              <li>
                <p className="task">No tasks</p>
              </li>
            )}
            <li className="footer">
              <p className="itemsLeft">{task.length} items left</p>
              <div className="filters">
                <button className="all" onClick={() => handleFilterAll()}>
                  All
                </button>
                <button className="active" onClick={() => handleFilterActive()}>
                  Active
                </button>
                <button
                  className="complete"
                  onClick={() => handleFilterComplete()}
                >
                  Complete
                </button>
              </div>
              <button className="clearCompleted" onClick={handleClearComplete}>
                Clear complete
              </button>
            </li>
            <li className="footer2">
              <div className="filters2">
                <button className="all" onClick={() => handleFilterAll()}>
                  All
                </button>
                <button className="active" onClick={() => handleFilterActive()}>
                  Active
                </button>
                <button
                  className="complete"
                  onClick={() => handleFilterComplete()}
                >
                  Complete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TaskView;

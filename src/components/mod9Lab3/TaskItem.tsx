// types/index.ts
import type { TaskStatus, Task } from "./TaskList";
import React, { useState } from "react";

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void; //declared but we didn't pass this prop, but it is still working. How?
}

type Priority = "low" | "medium" | "high";

function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  const [currentStatus, setCurrentStatus] = useState(task.status);

  // function
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentStatus(e.target.value as TaskStatus); //In progress
    onStatusChange(task.id, e.target.value as TaskStatus);
  };

  const statusStyles: { [key in TaskStatus]: string } = {
    pending: "text-yellow-500",
    "in-progress": "text-red-500",
    completed: "text-green-500",
  };

  const priorityStyles: { [key in Priority]: string } = {
    low: "text-yellow-500",
    medium: "text-blue-500",
    high: "text-red500",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-5 flex items-start justify-between border">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold items-start">{task.title}</h1>
        <div>{task.description}</div>
        <div>
          Status: {""}
          <span className={statusStyles[task.status]}>{task.status}</span>
        </div>
        <div>
          Priority: {""}
          <span className={priorityStyles[task.priority]}>{task.priority}</span>
        </div>
        <div>DueDate{task.dueDate}</div>
      </div>

      <div className="flex gap-10">
        <select
          value={currentStatus}
          onChange={handleChange}
          className={`ml-auto bg-blue-700 h-10 ${statusStyles[currentStatus]}`}
        >
          <option value="pending">
            <span>Pending</span>
          </option>
          <option value="in-progress">
            <span>In Progress</span>
          </option>
          <option value="completed">
            <span>Completed</span>
          </option>
        </select>
        <div>
          <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
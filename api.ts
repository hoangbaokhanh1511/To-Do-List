import { ITask, ITaskCreate } from "./types/task";

const baseURL = 'http://localhost:3001'; 

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseURL}/task`);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  const todos = await res.json();
  return todos;
};

export const addToDo = async(task: ITask) : Promise<ITask> => {
  const res = await fetch(`${baseURL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const result = await res.json();

  return result;
}

export const updateToDo = async(task: ITask) : Promise<ITask> => {
  const res = await fetch(`${baseURL}/task/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
  const result = await res.json();
  return result;
}


export const deleteToDo = async(id: string) : Promise<void> => {
  const res = await fetch(`${baseURL}/task/${id}`, {
    method: 'DELETE',
  });
  if(!res.ok) {
    throw new Error("Thất bại khi xoá Task");
  }
}
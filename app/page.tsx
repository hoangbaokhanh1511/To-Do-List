
import { Button } from "@heroui/react";
import AddTask  from "../components/AddTasks"
import TodoList from "@/components/TodoList";
import { getAllTodos } from "@/api";


export default async function HomePage() {
  const tasks = await getAllTodos();
  return (
    <main className="max-w-4xl mx-auto ">
      <div className="text-center my-5">
        <h1 className="text-3xl font-bold mb-3">TODO LIST APP</h1>
        <AddTask/>
      </div>
      <TodoList tasks = {tasks}/> 
    </main>
  );
}
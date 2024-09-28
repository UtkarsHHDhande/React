import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo('');
  };

  return (
    <form onSubmit={add} className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-gray-300 rounded-l-lg px-4 py-2 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-4 py-2 bg-green-600 text-white font-semibold transition-all duration-200 transform hover:scale-110 hover:bg-green-700 active:scale-100 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;

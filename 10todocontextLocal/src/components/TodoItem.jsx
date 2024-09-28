import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };
  
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border rounded-lg px-4 py-2 gap-x-4 shadow-lg transition-all duration-300 transform hover:scale-105 ${
        todo.completed ? 'bg-green-200' : 'bg-purple-200'
      }`}
    >
      {/* Checkbox with bounce animation */}
      <input
        type="checkbox"
        className="cursor-pointer w-5 h-5 accent-green-500 transition-all duration-200 transform hover:scale-110"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Editable Todo Text with animations */}
      <input
        type="text"
        className={`border-none outline-none w-full bg-transparent rounded-lg transition-all duration-300 transform ${
          isTodoEditable ? 'text-black border-black/20 px-2' : 'text-gray-600'
        } ${todo.completed ? 'line-through text-gray-500' : ''}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit/Save Button with hover animation */}
      <button
        className={`inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 transition-all duration-200 transform hover:scale-110 hover:bg-blue-200 ${
          todo.completed ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>

      {/* Delete Button with shake animation */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-red-100 text-red-600 transition-all duration-200 transform hover:scale-110 hover:bg-red-200 hover:text-red-800 active:animate-pulse"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;

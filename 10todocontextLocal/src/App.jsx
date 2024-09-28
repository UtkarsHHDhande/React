import { useState, useEffect } from 'react';
import { TodoProvider } from './contexts';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import Confetti from 'react-confetti'; // Confetti library
import { BsSun, BsMoon } from 'react-icons/bs'; // Icons for Light/Dark mode toggle

function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState('green'); // Theme selector

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Progress Calculation
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  // Confetti when all todos are completed
  const allCompleted = completedTodos === totalTodos && totalTodos > 0;

  // Toggle between dark and light mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Theme Change (Green, Blue, Red)
  const handleThemeChange = (newTheme) => setTheme(newTheme);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      {/* Confetti animation */}
      {allCompleted && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 relative`}>
        {/* Background graphics */}
        <div className={`absolute w-96 h-96 bg-${theme}-500 opacity-20 rounded-full -top-16 -left-20 animate-pulse`}></div>
        <div className={`absolute w-80 h-80 bg-${theme}-600 opacity-30 rounded-full -bottom-20 -right-20 animate-bounce`}></div>

        <div className={`relative w-full max-w-2xl mx-auto shadow-lg rounded-lg ${darkMode ? 'bg-white/10 text-white' : 'bg-white text-black'} backdrop-blur-lg px-6 py-8`}>
          <div className="flex justify-between items-center mb-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-2xl p-2 rounded-full hover:bg-opacity-50 transition-all"
            >
              {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-gray-600" />}
            </button>

            {/* Theme Selector */}
            <div className="flex space-x-2">
              <button
                className="w-6 h-6 rounded-full bg-green-500 hover:ring-4 ring-green-300"
                onClick={() => handleThemeChange('green')}
              ></button>
              <button
                className="w-6 h-6 rounded-full bg-blue-500 hover:ring-4 ring-blue-300"
                onClick={() => handleThemeChange('blue')}
              ></button>
              <button
                className="w-6 h-6 rounded-full bg-red-500 hover:ring-4 ring-red-300"
                onClick={() => handleThemeChange('red')}
              ></button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-8 tracking-wider">
            Manage Your Todos
          </h1>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
            <div
              className={`bg-${theme}-500 h-full rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Todo Form */}
          <div className="mb-8">
            <TodoForm />
          </div>

          {/* Todo List */}
          <div className="flex flex-wrap gap-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {todos.length === 0 && (
            <div className="text-center text-gray-400 mt-4 text-lg">
              No todos yet, start by adding some!
            </div>
          )}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

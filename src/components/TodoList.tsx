import React from 'react';
import { Calendar, CheckCircle2, Circle, Clock, Tag, Trash2 } from 'lucide-react';
import { Todo, Category } from '../types';

interface TodoListProps {
  todos: Todo[];
  categories: Category[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoList({ todos, categories, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const isNearDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#94a3b8';
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border 
            ${isNearDue(todo.dueDate) ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`}
        >
          <button
            onClick={() => onToggleTodo(todo.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            {todo.completed ? 
              <CheckCircle2 className="w-6 h-6 text-green-500" /> : 
              <Circle className="w-6 h-6" />
            }
          </button>
          
          <div className="flex-1">
            <p className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </p>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <Tag className="w-4 h-4" style={{ color: getCategoryColor(todo.categoryId) }} />
              <span className="text-gray-600">{getCategoryName(todo.categoryId)}</span>
              <Clock className="w-4 h-4 ml-2 text-gray-400" />
              <span className={`${isNearDue(todo.dueDate) ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
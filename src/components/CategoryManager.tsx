import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Category } from '../types';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
}

export default function CategoryManager({ categories, onAddCategory, onDeleteCategory }: CategoryManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#94a3b8' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      onAddCategory(newCategory);
      setNewCategory({ name: '', color: '#94a3b8' });
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <div
            key={category.id}
            className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
            <span className="text-sm" style={{ color: category.color }}>
              {category.name}
            </span>
            <button
              onClick={() => onDeleteCategory(category.id)}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3">
          <input
            type="text"
            value={newCategory.name}
            onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Category name"
            className="flex-1 px-3 py-1 border rounded"
            autoFocus
          />
          <input
            type="color"
            value={newCategory.color}
            onChange={e => setNewCategory({ ...newCategory, color: e.target.value })}
            className="w-10 h-8"
          />
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-4 py-1 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
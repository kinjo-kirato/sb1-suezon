export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string;
  dueDate: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
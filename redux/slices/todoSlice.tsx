// redux/slices/todoSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { prisma } from '@/utils/prisma'; // Ensure this import points to the correct path
import { todoType } from '@/types/todoTypes';
import axios from 'axios';

interface TodoState {
  todos: todoType[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Define the async thunk
export const fetchTodos : any = createAsyncThunk(
  'todos/fetchTodos',
  async ({ filter, startDate, endDate }: { filter: string; startDate?: string; endDate?: string }) => {
    const response = await axios.get('/api/todos', {
      params: { filter, startDate, endDate },
    });
    return response.data;
  }
);

// Async thunk to create or update a todo
// Define the async thunk
export const saveTodo : any = createAsyncThunk(
  'todos/saveTodo',
  async (todoData: { title: string; content: string; todoId?: string }) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      throw new Error('Failed to save todo');
    }
    const data = await response.json();
    return data as todoType;
  }
);

// Async thunk to delete a todo
export const removeTodo : any = createAsyncThunk('todos/removeTodo', async (todoId: string) => {
  await fetch(`/api/todos/${todoId}`, {
    method: 'DELETE',
  });
  return todoId;
});

// Async thunk to toggle todo status
export const toggleTodoStatus : any = createAsyncThunk('todos/toggleTodoStatus', async (todoId: string) => {
  const response = await fetch(`/api/todos/${todoId}/toggle`, {
    method: 'POST',
  });
  const data = await response.json();
  return data as boolean;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<todoType[]>) => {
        state.todos = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      });
  },
});

export default todoSlice.reducer;
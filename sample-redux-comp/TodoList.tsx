"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchTodos } from '@/redux/slices/todoSlice';
import Todo from '@/components/shared/Todo';
import AddTodo from '@/components/shared/AddTodo';
import { todoType } from '@/types/todoTypes';

const TodosPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos: todoType[] = useSelector((state: RootState) => state.todos.todos);
  const status = useSelector((state: RootState) => state.todos.status);

  const [filter, setFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTodos({ filter, startDate, endDate }));
  }, [dispatch, filter, startDate, endDate]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Failed to load todos</div>;

  return (
    <>
      <div className="w-screen py-20 flex justify-center flex-col items-center">
        <span className="text-3xl font-extrabold uppercase">Todos</span>
        <h1 className="text-3xl font-extrabold uppercase mb-5">
          Next.js 14
          <span className="text-orange-700 ml-2">Server Actions</span>
        </h1>

        <div className="flex flex-col gap-4 mb-10">
          <button onClick={() => setFilter('last24Hours')}>Last 24 Hours</button>
          <button onClick={() => setFilter('last7Days')}>Last 7 Days</button>
          <button onClick={() => setFilter('custom')}>Custom Range</button>

          {filter === 'custom' && (
            <div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex justify-center flex-col items-center w-[1000px]">
          <AddTodo />
          <div className="flex flex-col gap-5 items-center justify-center mt-10 w-full">
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <Todo todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodosPage;


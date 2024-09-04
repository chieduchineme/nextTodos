// pages\todos\[todoId].tsx
import { GetServerSideProps } from 'next';
import prismadb from '@/lib/prismadb';
import EditTodo from '@/components/EditTodo';
import serverAuth from '@/lib/serverAuth';

const TodoPage: React.FC<{ todo: any }> = ({ todo }) => {
    return <EditTodo todo={todo} />;
};

export default TodoPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { todoId } = context.params!;

    // Destructure context.req and context.res
    const req = context.req as any;
    const res = context.res as any;

    try {
        const { currentUser } = await serverAuth(req, res);

        const todo = await prismadb.todo.findUnique({
            where: { id: String(todoId) },
            include: { user: true },
        });

        if (!todo || todo.userId !== currentUser.id) {
            return {
                notFound: true,
            };
        }

        // Convert Date objects to ISO strings
        const serializeDates = (obj: any) => {
            if (obj === null || obj === undefined) return obj;
            if (obj instanceof Date) return obj.toISOString();
            if (typeof obj === 'object') {
                Object.keys(obj).forEach(key => {
                    obj[key] = serializeDates(obj[key]);
                });
            }
            return obj;
        };

        const serializedTodo = serializeDates({
            ...todo,
            user: serializeDates(todo.user),
        });

        return {
            props: { todo: serializedTodo },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

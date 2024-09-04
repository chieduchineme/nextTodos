// inside src/app/not-found.tsx
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold
    text-emerald-500">NextTodo</h1>
            <div>
                <Link href="/"
                    className="text-emerald-500 
                    font-bold underline">
                    Sorry! Looks like you
                    are on a wrong page.
                    Go back to home 
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
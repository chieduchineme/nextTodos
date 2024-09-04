
import { getSession } from 'next-auth/react'; 
import { NextPageContext } from 'next';

// Server-side function to check if the user is authenticated before rendering the page.
export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context); // Get the session information for the current user.

    if (!session) {
        // If there is no session, redirect the user to the authentication page.
        return {
            redirect: {
                destination: '/auth',
                permanent: false, // The redirection is not permanent, so it's set to false.
            },
        };
    }

    return {
        props: {}, // If the user is authenticated, render the page with empty props.
    };
}
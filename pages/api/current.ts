import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';

/**
 * API Route Handler for fetching the current user's information.
 * 
 * This handler only supports GET requests. It uses the `serverAuth` 
 * function to authenticate the user and retrieve their details.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the current user's information,
 *          or an error status if the request is not a GET request or 
 *          if authentication fails.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    try {
        // Authenticate the user and retrieve their information
        const { currentUser } = await serverAuth(req, res);
        
        // Return the current user's information as a JSON response
        return res.status(200).json(currentUser);
    } catch (error) {
        // Log any errors that occur during authentication
        console.log(error);
        
        // Return a 400 Bad Request status if authentication fails
        return res.status(400).end();
    }
}

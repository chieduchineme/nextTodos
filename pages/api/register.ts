import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../lib/prismadb';

/**
 * API handler for user registration.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A response indicating the result of the registration process.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Check if the HTTP method is POST, otherwise return a 405 Method Not Allowed response.
		if (req.method !== 'POST') {
			return res.status(405).end();
		}

		// Destructure the email, name, and password from the request body.
		const { email, name, password } = req.body;

		// Check if a user with the provided email already exists in the database.
		const existingUser = await prismadb.user.findUnique({
			where: {
				email
			}
		});

		// Validate the user's name to ensure it's not empty.
		if (name.length === 0) {
			return res.status(422).json({ error: 'Invalid username' });
		}

		// If a user with the given email already exists, return an error response.
		if (existingUser) {
			return res.status(422).json({ error: 'Email taken' });
		}

		// Validate the password to ensure it's not empty.
		if (password.length === 0) {
			return res.status(422).json({ error: 'Invalid password' });
		}

		// Hash the user's password using bcrypt with a salt factor of 12.
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create a new user in the database with the provided email, name, and hashed password.
		const user = await prismadb.user.create({
			data: {
				email,
				name,
				hashedPassword,
				image: '',
				emailVerified: new Date(),
			}
		});

		// Return a success response with the newly created user's data.
		return res.status(200).json(user);
	} catch (error) {
		// Log any errors that occur during the process and return a 400 Bad Request response with the error message.
		console.log(error);
		return res.status(400).json({ error: `Something went wrong: ${error}` });
	}
}

import Input from '@/components/Form/Input';
import axios from 'axios'; 
import { signIn } from 'next-auth/react'; 
import Image from 'next/image'; 
import { useCallback, useState } from 'react'; 

// Main authentication component
const Auth = () => {
    // State variables for form inputs
    const [name, updateName] = useState(''); // Stores the username for registration
    const [email, updateEmail] = useState(''); // Stores the email for login/registration
    const [password, updatePassword] = useState(''); // Stores the password for login/registration

    // State variable to toggle between login and registration modes
    const [variant, updateVariant] = useState('login'); // Default is 'login'

    // Toggles between login and registration variants
    const toggleVariant = useCallback(() => {
        updateVariant((currentVariant) =>
            currentVariant === 'login' ? 'register' : 'login'
        );
    }, []);

    // Handles login process
    const login = useCallback(
        async (e: any) => {
            e.preventDefault(); // Prevents default form submission behavior
            try {
                // Calls the signIn method with 'credentials' provider, sending email and password
                await signIn('credentials', {
                    email,
                    password,
                    callbackUrl: '/profile', // Redirects to profile page on successful login
                });
            } catch (error) {
                console.log(error); // Logs any errors that occur during login
            }
        },
        [email, password] // Dependencies for the login function
    );

    // Handles registration process
    const register = useCallback(
        async (e: any) => {
            e.preventDefault(); // Prevents default form submission behavior
            try {
                // Sends a POST request to the /api/register endpoint with name, email, and password
                const response = (
                    await axios.post('/api/register', { name, email, password })
                ).data;
                // Calls the login function after successful registration
                login(e);
            } catch (error) {
                console.log('auth page : ' + error); // Logs any errors that occur during registration
            }
        },
        [name, email, password, login] // Dependencies for the register function
    );

    // Main JSX structure
    return (
        <div className="relative h-full w-full bg-[url('/images/hero.svg')] bg-no-repeat bg-fixed bg-cover">
            {/* Background styling and navigation bar */}
            <div className='bg-black w-full h-full lg:bg-opacity-70'>
                <nav className='px-12 py-5 flex md:justify-start justify-center'>
                    {/* Logo image in the navigation bar */}
                    <Image
                        src='/images/bb1-logo-text.svg'
                        alt='NextTodo | Logo'
                        width={250}
                        height={0}
                        priority
                        className='w-auto h-auto'
                    />
                </nav>
                <div className='flex justify-center'>
                    {/* Form container */}
                    <div className='bg-black bg-opacity-60 rounded-lg backdrop-blur-xs 2xl:w-4/12 px-16 py-16'>
                        {/* Conditional rendering of form title based on variant */}
                        <h2 className='text-white text-4xl font-medium mb-8'>
                            {variant === 'login' ? 'SignIn' : 'Register'}
                        </h2>
                        <div>
                            {/* Conditional rendering of username input field during registration */}
                            {variant === 'register' && (
                                <Input
                                    type='text'
                                    id='username'
                                    label='Enter username'
                                    value={name}
                                    onChange={(e: any) => {
                                        updateName(e.target.value); // Updates the username state
                                    }}
                                />
                            )}
                            {/* Email input field for both login and registration */}
                            <Input
                                type='email'
                                id='email'
                                label='Enter email'
                                value={email}
                                onChange={(e: any) => {
                                    updateEmail(e.target.value); // Updates the email state
                                }}
                            />
                            {/* Password input field for both login and registration */}
                            <Input
                                type='password'
                                id='password'
                                label='Enter password'
                                value={password}
                                onChange={(e: any) => {
                                    updatePassword(e.target.value); // Updates the password state
                                }}
                            />

                            {/* Button to submit form, with action depending on the current variant */}
                            <button
                                onClick={variant === 'login' ? login : register}
                                className='bg-red-600 hover:bg-red-700 transition duration-300 py-3 w-full text-lg text-center text-white rounded-lg'
                            >
                                {variant === 'login' ? 'LogIn' : 'SignUp'}
                            </button>

                            {/* Placeholder for future social login buttons */}
                            {/* <div className='mt-6 flex justify-center items-center'>
                                <button
                                    onClick={() => signIn('google', { callbackUrl: '/profile' })}
                                    className='bg-white rounded-full p-1 mx-2'
                                >
                                    <img src='/images/auth/google.svg' alt='' className=' w-10' />
                                </button>
                                <button
                                    onClick={() => signIn('github', { callbackUrl: '/profile' })}
                                    className='bg-white rounded-full p-1 mx-2'
                                >
                                    <img src='/images/auth/github.svg' alt='' className=' w-10' />
                                </button>
                            </div> */}
                        </div>
                        {/* Toggle link to switch between login and registration */}
                        <p className='text-neutral-500 mt-6'>
                            {variant === 'login'
                                ? 'First time using NextTodo?'
                                : 'Already a NextTodo user?'}
                            <span
                                onClick={toggleVariant}
                                className='text-white ml-2 cursor-pointer'
                            >
                                {variant === 'login'
                                    ? 'Create a new account'
                                    : 'Login your account'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

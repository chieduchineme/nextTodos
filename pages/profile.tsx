import React, { useEffect } from 'react';
import Image from 'next/image';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

const Profile = () => {
	const { data: user } = useCurrentUser();
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push('/');
		}, 2000); // Redirect after 2 seconds

		// Cleanup the timer when the component unmounts
		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className='text-white flex justify-center items-center w-screen h-screen'>
			<div>
				<Image
					src='/images/auth/profile.png'
					alt='Profile picture'
					width={100}
					height={0}
					priority
					className='w-auto h-auto'
				/>
				<h3 className='mt-6 text-4xl uppercase text-center'>Welcome {user?.name}</h3>
				<p className='text-white text-center'>You are signed in using {user?.email}</p>
			</div>
		</div>
	);
};

export default Profile;

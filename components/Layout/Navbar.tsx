import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavItems from './NavItems';
import MobileMenu from './MobileMenu';
import { signOut, useSession } from 'next-auth/react';

const TOP_OFFSET = 60;

const Navbar = () => {
	const [showMobileMenu, setMobileMenu] = useState(false);
	const [showNavBackground, setNavBackground] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	const { data: session } = useSession();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > TOP_OFFSET) {
				setNavBackground(true);
			} else {
				setNavBackground(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const toggleMobileMenu = useCallback(() => {
		setMobileMenu((current) => !current);
	}, []);

	const toggleDropdown = useCallback(() => {
		setShowDropdown((current) => !current);
	}, []);

	return (
		<>
			<nav
				className={`flex justify-between items-center w-full py-3 px-5 sticky top-0 z-40 transition duration-150 ${
					showNavBackground && 'bg-black bg-opacity-50'
				}`}
			>
				<div className='flex items-center'>
					<Link href='/'>
						<Image
							src='/images/bb1-logo-text.svg'
							alt='NextTodo Logo'
							width={250}
							height={0}
							priority
							className='w-auto h-auto'
						/>
					</Link>

					<ul className='text-white list-none lg:inline-flex gap-5 mx-6 hidden'>
						<NavItems label='Your Todo-list' />
						<NavItems label='All Todo-list' />
						<NavItems label='Reminders' />
					</ul>

					<div className='lg:hidden flex flex-row'>
						<span
							className='text-white mx-6 cursor-pointer select-none'
							onClick={toggleMobileMenu}
						>
							Browse
							<em
								className={`bi bi-chevron-${showMobileMenu ? 'up' : 'down'} ml-2`}
							></em>
						</span>
						<MobileMenu visible={showMobileMenu} />
					</div>
				</div>
				<div className='inline-flex gap-8 text-white text-lg relative'>
					<span className='cursor-pointer'>
						<em className='bi bi-search'></em>
					</span>
					<span className='cursor-pointer'>
						<em className='bi bi-bell'></em>
					</span>
					<span
						className='cursor-pointer relative'
						onClick={toggleDropdown}
					>
						{/* User/Contact Icon */}
						<em className='bi bi-person-circle'></em>

						{/* Dropdown Menu */}
						{showDropdown && (
							<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2'>
								<p className='block px-4 py-2 text-sm text-gray-700'>
									{session?.user?.name}
								</p>
								<button
									onClick={() => signOut()}
									className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
								>
									Sign out
								</button>
							</div>
						)}
					</span>
				</div>
			</nav>

			{/* to create space below the navbar */}
			<div className='mt-10 md:mt-20'></div>
		</>
	);
};

export default Navbar;

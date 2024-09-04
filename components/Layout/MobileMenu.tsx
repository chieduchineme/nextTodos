import React from 'react';
import NavItems from './NavItems';

interface MobileMenuProps {
	visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
	if (!visible) {
		return null;
	}

	return (
		<div className='bg-black bg-opacity-40 backdrop-blur-sm absolute top-20 w-72 p-6 transition duration-150 select-none rounded-lg'>
			<ul className='text-white text-lg inline-flex flex-col gap-5 mb-2'>
				<NavItems label='Your Todo-list' />
				<NavItems label='All Todo-list' />
				<NavItems label='Reminders' />
			</ul>
		</div>
	);
};

export default MobileMenu;

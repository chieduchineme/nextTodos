import React from 'react';

interface NavItemProps {
	label: string;
}

const NavItems: React.FC<NavItemProps> = ({ label }) => {
	return <li className='px-3 cursor-pointer'>{label}</li>;
};

export default NavItems;

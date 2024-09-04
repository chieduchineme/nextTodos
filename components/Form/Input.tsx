import React from 'react';

interface inputProps {
	id: string;
	onChange: any;
	value: string;
	label: string;
	type: string;
}

const Input: React.FC<inputProps> = ({ id, onChange, value, label, type }) => {
	return (
		<div className='relative mb-4'>
			<input
				id={id}
				onChange={onChange}
				value={value}
				type={type}
				className='block rounded-lg px-6 py-3 w-full text-lg text-white bg-neutral-800 focus:outline-none focus:ring-0 focus:border-b focus:border-white invalid:border-red-500 placeholder:text-neutral-600 transition focus:duration-300'
				placeholder={label}
				autoComplete='off'
			/>
		</div>
	);
};

export default Input;

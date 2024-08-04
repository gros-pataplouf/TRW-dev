import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './dropdown.module.css';

const DropdownNav = ({ name, menuItems, inHamburger }) => {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef();

	useEffect(() => {
		const handler = (event) => {
			console.log('the event ref is', ref);
			if (isOpen && ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, [isOpen]);

	return (
		<div
			className={`styles.dropdownContainer.${
				inHamburger ? 'hamburger' : ''
			}`}
			ref={ref}
		>
			<button
				className={`${styles.dropdownToggle} `}
				onClick={() => setIsOpen(!isOpen)}
				aria-haspopup="true"
			>
				{name} <span></span>
			</button>
			{isOpen && (
				<div className="hamburger">
					<ul className={styles.dropdownMenu}>
						{menuItems.map((item, index) => (
							<li key={index} className={styles.dropdownMenuItem}>
								<NavLink
									to={`/${item.route}`}
									className={({ isActive }) =>
										isActive ? styles.active : ''
									}
									onClick={() => setIsOpen(!isOpen)}
								>
									{item.title}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropdownNav;

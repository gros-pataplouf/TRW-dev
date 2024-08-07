import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './dropdown.module.css';

const DropdownNav = ({ name, menuItems, inHamburger }) => {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef();

	useEffect(() => {
		const handler = (event) => {
			if (isOpen && ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, [isOpen]);

	const handleClick = () => {
		setIsOpen(!isOpen);
		closeNavbar();
	};

	return (
		<div ref={ref}>
			<button
				className={`${
					inHamburger
						? styles.hamburgerDropdownToggle
						: styles.dropdownToggle
				}`}
				onClick={() => setIsOpen(!isOpen)}
				aria-haspopup="true"
			>
				{name} <span></span>
			</button>
			{isOpen && (
				<div>
					<ul
						className={`${
							inHamburger
								? styles.hamburgerDropdownMenu
								: styles.dropdownMenu
						}`}
					>
						{menuItems.map((item, index) => (
							<li key={index} className={styles.dropdownMenuItem}>
								<NavLink
									to={`/${item.route}`}
									className={({ isActive }) =>
										isActive ? styles.active : ''
									}
									onClick={handleClick}
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

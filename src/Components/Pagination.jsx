/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */


import React from "react";

const Pagination = React.memo(({ postsPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="navigation_wrapper">
		<ul className="pagination">
			{pageNumbers.map((number) => (
			<li key={number} className="page-item">
				<a
				onClick={() => paginate(number)}
				href="#"
				className="page-link"
				>
				{number}
				</a>
			</li>
			))}
		</ul>
		</nav>
	);
});

export default Pagination;

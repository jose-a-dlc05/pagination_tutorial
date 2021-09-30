import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
	const [sample, setSample] = useState({
		users: [],
		total: null,
		per_page: null,
		current_page: null,
	});

	useEffect(() => {
		makeHttpRequestWithPage(1);
	}, []);

	const makeHttpRequestWithPage = (pageNumber) => {
		fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((result) => {
				setSample({
					users: result.data,
					total: result.total,
					per_page: result.per_page,
					current_page: result.page,
				});
			});
	};

	const pageNumbers = [];
	if (sample.total !== null) {
		for (let i = 1; i <= Math.ceil(sample.total / sample.per_page); i++) {
			pageNumbers.push(i);
		}
	}

	return (
		<div className={styles.app}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>S/N</th>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>
					{sample.users.map((user) => {
						return (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.first_name}</td>
								<td>{user.last_name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<div className={styles.pagination}>
				<span onClick={() => makeHttpRequestWithPage(1)}>&laquo;</span>
				{pageNumbers.map((number) => {
					let classes = sample.current_page === number ? styles.active : '';
					return (
						<span
							key={number}
							className={classes}
							onClick={() => makeHttpRequestWithPage(number)}
						>
							{number}
						</span>
					);
				})}
				<span onClick={() => makeHttpRequestWithPage(1)}>&raquo;</span>
			</div>
		</div>
	);
}

export default App;

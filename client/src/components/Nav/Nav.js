import React from "react";

const Nav = () => (
	<nav className="navbar navbar-inverse navbar-top">
		<div className="container-fluid">
			<div className="navbar-header">
				<button type="button" className="collapsed navbar-toggle">
					<span className="sr-only">Toggle Navigation</span>
					<span className="icon-bar" /> <span className="icon-bar" />
					<span className="icon-bar" />
				</button>
				<a href="/" className="navbar-brand">
					Home
				</a>
				<a href="/saved" className="navbar-brand">
					Saved
				</a>
			</div>
		</div>
	</nav>
);

export default Nav;
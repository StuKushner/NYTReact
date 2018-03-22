import React from "react";

const Saved = props => (
	<div className="container">
	<div className="row">
		<li className="list-group-item">
			<h3>
				<span>
					<strong><a href={props.url} target="_blank">
						{props.title}
						</a>
					</strong>
				</span>
				<span className="btn-group pull-right">
					<button className="btn btn-danger" onClick={() => props.deleteSavedArticles(props._id)}>
						Delete This Article
					</button>
				</span>
			</h3>
			<p>Date Published: {props.date}</p>
		</li>
	</div>
	</div>
);

export default Saved;
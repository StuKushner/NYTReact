import React from "react";

const Results = props => (
	<div className="row">
		<li className="list-group-item">
			<h3>
				<span>
					<strong><a href={props.url} target="_blank">
						{props.title}
					</strong>
				</span>
				<span className="btn-group pull-right">
					<button className="btn btn-success" onClick={() => props.saveArticle(props._id)}>Save Article</button>
				</span>
			</h3>
			<p>Date Published: {props.date}
		</li>
	</div>
);

export default Results;
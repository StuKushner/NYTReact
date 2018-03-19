import React from "react";

const Search = props => (
	<div className="panel panel-primary">
		<div className="panel-heading">
			<h3 className="panel-title">
				<strong>
					<i className="fa fa-list-alt">
						Search Parameters
					</i>
				</strong>
			</h3>
		</div>
		<div className="panel-body">
			<form>
				<div className="form-group">
					<label htmlFor="search">Search Topic:</label>
					<input onChange={props.handleTopicChange} type="text" className="form-control" id="search-topic">
				</div>
				<div className="form-group">
					<label htmlFor="startYear">Start Year:</label>
					<input onChange={props.handleStartYearChange} type="text" className="form-control" id="search-start">
				</div>
				<div className="form-group">
					<label htmlFor="endYear">End Year:</label>
					<input onChange={props.handleEndYearChange} type="text" className="form-control" id="search-end">
				</div>
				<button onClick={props.handleFormSubmit} className="btn btn-default" id="run-search">
				<i className="fa fa-search">Search</i></button>
			</form>
		</div>
	</div>

	<br/><br/>

	<div className="panel panel-primary">
		<div className="panel-heading">
			<h3 className="panel-title">
				<strong>
					<i className="fa fa-list-table">
						Results
					</i>
				</strong>
			</h3>
		</div>
		<div className="panel-body">
			{props.getAllArticles()}
		</div>
	</div>
);

export default Search;
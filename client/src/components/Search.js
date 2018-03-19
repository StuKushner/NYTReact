import React from "react";

const Search = props => (
	<div className="panel panel-primary">
		<div className="panel-heading">
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
	</div>
);

export default Search;
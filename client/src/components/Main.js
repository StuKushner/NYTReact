import React, { Component } from "react";
import Saved from "./Saved";
import Results from "./Results";
import Search from "./Search";
import API from "../utils/api";

class Main extends Component {

	state = {
		topic: "",
		startYear: "",
		endYear: "",
		articles: [],
		saved: []
	};

	// When the user first loads the app, all saved articles will be displayed

	componentDidMount() {
		this.loadSavedArticles();
	};

	// Method that gets all of the saved articles from the database
	loadSavedArticles = () => {
		API.getArticles()
		.then(res => this.setState({ saved: res.data, topic: "", startYear: "", endYear: "" })
		)
		.catch(err => console.log(err));
	};

	// Method that lets user deletes a saved article
	deleteSavedArticles = id => {
		API.deleteArticles()
		.then(res => this.loadSavedArticles())
		.catch(err => console.log(err));
	};

	// Method that gets all of the articles that fit the search criteria
	getAllArticles = () => {
		return this.state.articles.map(article => (
			<Results
				_id={article._id}
				key={article._id}
				title={article.headline.main}
				date={article.pub_date}
				url={article.web_url}
				handleSaveButton={this.handleSaveButton}
				loadSavedArticles={this.loadSavedArticles}
			/>
		));
	}

	// Method that gets all of the saved articles
	getSavedArticles = () => {
		return this.state.saved.map(save => (
			<Saved
				_id={save._id}
				key={save._id}
				title={save.title}
				date={save.date}
				url={save.url}
				deleteSavedArticles={this.deleteSavedArticles}
				loadSavedArticles={this.loadSavedArticles}
			/>
		));
	}

	handleTopicChange = event => {
		this.setState({ topic: event.target.value });
	} 

	handleStartYearChange = event => {
		this.setState({ startYear: event.target.value });
	}

	handleEndYearChange = event => {
		this.setState({ topic: event.target.value });
	}

	// What happens when the user submits the form
	handleFormSubmit = event => {
		event.preventDefault();
		API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
		.then(res => this.setState({ articles: res.data.response.docs }))
		.catch(err => console.log(err));
	}

	// What happens when the user saves an article

	saveArticle = id => {
		const findArticleByID = this.state.articles.find((article) => article._id === id);
		const saveNewArticle = {
			title: findArticleByID.headline.main,
			date: findArticleByID.pub_date,
			url: findArticleByID.web_url
		};
		API.saveArticles(saveNewArticle)
		.then(this.getSavedArticles());
	};

	// How the main page will be displayed
	render() {
		return (
			<div className="main-container">
				<div className="container">
					<div className="jumbotron" style="background-color: #20315A ; color: white">
						<h1 className="text-center">
							<strong>
								<i className="fa fa-newspaper-o">
									New York Times Search
								</i>
							</strong>
						</h1>
					</div>
					<Search
						handleTopicChange={this.handleTopicChange}
						handleStartYearChange={this.handleStartYearChange}
						handleEndYearChange={this.handleEndYearChange}
						handleFormSubmit={this.handleFormSubmit}
						getAllArticles={this.getAllArticles}
					/>
					<div className="row">
						<div className="col-sm-12">
							<br>
							<div className="panel panel-primary">
								<div className="panel-heading">
									<h3 className="panel-title">
										<strong>
											<i className="fa fa-list-alt">
											Saved Articles
											</i>
										</strong>
									</h3>
								</div>
								<div className="panel-body">
									<ul className="list-group">
										{this.getSavedArticles()}
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<hr>
							<h5 className="text-center">
								<small>
									&Copy; Copyright 2018 Stuart Kushner
								</small>
							</h5>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
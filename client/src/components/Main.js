import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import { Container, Row, Col } from "./components/Grid";
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
			<Save
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

	// Keeps track of what the user put in the topic field
	handleTopicChange = event => {
		this.setState({ topic: event.target.value });
	} 

	// Keeps track of what the user put in the startYear field
	handleStartYearChange = event => {
		this.setState({ startYear: event.target.value });
	}

	// Keeps track of what the user put in the endYear field
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
			<div>
				<Container>
				// Jumbotron
				<Jumbotron />
				// Search form and Results Form
				<Search
					handleTopicChange={this.handleTopicChange}
					handleStartYearChange={this.handleStartYearChange}
					handleEndYearChange={this.handleEndYearChange}
					handleFormSubmit={this.handleFormSubmit}
					getAllArticles={this.getAllArticles}
				/>
					<Row>
						<Col size="sm-12">
							<br>
							<div className="panel panel-primary">
								<div className="panel panel-heading">
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
										{this.getSavedArticles}
									</ul>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<Footer />	
			</div>
		);
	}
}

export default Main;
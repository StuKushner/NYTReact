import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/api";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import SaveBtn from "../../components/SaveBtn";

class Home extends Component {
	state = {
		topic: "",
		startYear: "",
		endYear: "",
		articles: []
	};

	searchArticles = (event) => {
		event.preventDefault();
		API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
		.then(res => this.setState({ articles: res.data.response.docs, topic: "", startYear: "", endYear: "" }))
		.catch(err => console.log(err));
		}
	};

	saveArticle = (title, date, url) => {
		if (title && date && url) {
			API.saveArticles({
			title: title,
			date: date,
			url: url
		})
			.then(res => console.log("Articles Saved!"));
			.catch(err => console.log(err));
		}
	};

	handleInputChange = event => {
    	const { name, value } = event.target;
    	this.setState({
      		[name]: value
    	});
  	};

  	render() {
  		return (
  			<Container fluid>
  				<Row>
  					<Col size="md-12">
  						<div className="panel panel-primary">
  							<div className="panel panel-heading">
  								<h3 className="panel-title">Search Parameters</h3>
  							</div>
  							<div className="panel-body">
  								<form>
  									<Input
  										value={this.state.topic}
  										onChange={this.handleInputChange}
  										name="topic"
  										placeholder="Search Topic"
  									/>
  									<Input
  										value={this.state.startYear}
  										onChange={this.handleInputChange}
  										name="startYear"
  										placeholder="Search Start Year"
  									/>
  									<Input
  										value={this.state.endYear}
  										onChange={this.handleInputChange}
  										name="startYear"
  										placeholder="Search End Year"
  									/>
  									<FormBtn
  										disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
  										onClick={this.searchArticles}
  									>
  										Search
  									</FormBtn>
  								</form>
  							</div>
  						</div>
  					</Col>
  				</Row>
  				<Row>
  					<Col size="md-12">
  						{this.state.articles.length ? (
  							<div className="panel panel-primary">
  								<div className="panel panel-heading">
  									<h3 className="panel-title">Search Results</h3>
  								</div>
  								<div className="panel-body">
  								<List>
  									{this.state.articles.map(article => (
  										<ListItem
  											key={article._id}
  											title={article.headline.main}
  											date={article.pub_date}
  											url={article.web_url}
  										>
  										<SaveBtn onClick={() => this.saveArticle(
  											article.headline.main, 
  											article.pub_date, 
  											article.web_url)} />
  										</ListItem> ))}
  								</List>
  								</div>
  							</div>
  						) : (
  						<h1 className="text-center">No Results Found</h1>
  						)
  					}
  					</Col>
  				</Row>
  			</Container>
  		);
  	}
}

export default Home;


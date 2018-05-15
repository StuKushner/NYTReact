import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import api from "../../utils/API.js";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Saved extends Component {
	state = {
		topic: "",
		startYear: "",
		endYear: "",
		articles: []
	};

  componentDidMount() {
    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    api.getArticles()
    .then(res =>
      this.setState({ articles: res.data })
      )
    .catch(err => console.log(err));
  };

  deleteSavedArticle = (id) => {
    api.deleteArticles()
    .then(res => this.loadSavedArticles())
    .catch(err => console.log(err));
  }

	handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      	[name]: value
    });
  };

  	render() {
  		return (
        <div>
  			 <Container fluid>
  				<Row>
            <Col size="md-12">
              {this.state.articles.length ? (
                <div className="panel panel-primary">
                  <div className="panel panel-heading">
                    <h3 className="panel-title">Search Results</h3>
                  </div>
                  {this.state.articles.length ? (
                    <div className="panel-body">
                    <List>
                    {this.state.articles.map(article => (
                      <ListItem
                        key={article._id}
                        title={article.headline.main}
                        date={article.pub_date}
                        url={article.web_url}
                      >
                      <DeleteBtn onClick={() => this.deleteSavedArticle(
                        article._id)} />
                      </ListItem>
                    ))}
                  </List>
                  </div>
                </div>
                )
              ) : (
                <h1 className="text-center">No Results Found</h1>
              )
            }
            </Col>
          </Row>
  			 </Container>
        </div>
  		);
  }
}

export default Saved;
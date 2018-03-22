import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Home from "./components/Home";
import Saved from "./components/Saved";

const App = () => (
	<Router>
		<div>
			<Nav />
			<Jumbotron />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/saved" component={Saved} />
			</Switch>
		</div>
	</Router>
);
	

export default App;




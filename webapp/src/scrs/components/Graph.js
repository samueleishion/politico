import React from 'react'; 
import d3 from 'd3'; 

module.exports = React.createClass({
	getInitialState: function() {
		console.log("Sidebar.getInitialState"); 

		return {
			data:this.props.data 
		};
	},
	componentWillReceiveProps(nextProps) {
		this.setState(nextProps); 
	}, 
	render: function() {
		console.log("Sidebar.render",this.state.sentimentData); 
		return (
			<div className="app-graph">
			</div>
		); 
	}
}); 
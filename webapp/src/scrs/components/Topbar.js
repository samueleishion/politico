import React from 'react'; 
import moment from 'moment'; 

module.exports = React.createClass({
	getInitialState: function() {
		console.log("Topbar.getInitialState"); 

		return {
		};
	},
	render: function() {
		console.log("Topbar.render",this.state.data); 
		return (
			<div className="app-topbar">
				<select onChange={this.props.selectSpeech} value={this.props.selectedIndex}>
					{this.props.data.map((e,i) => (
						<option key={i} value={i}>{moment.unix(e.speech.datetime).format("YYYY")+" "+e.author.last+", "+e.author.first}</option> 
					))}
				</select> 
			</div>
		); 
	}
}); 
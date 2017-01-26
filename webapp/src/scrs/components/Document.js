import React from 'react'; 

module.exports = React.createClass({
	getInitialState: function() {
		console.log("Document.getInitialState"); 

		return {
			data:this.props.data.data
		};
	},
	render: function() {
		// console.log("Document.render",this.state.data); 
		return (
			<div className="app-document">
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
				Documents<br />
			</div>
		); 
	}
}); 
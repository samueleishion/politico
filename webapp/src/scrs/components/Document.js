import React from 'react'; 

module.exports = React.createClass({
	getInitialState: function() {
		console.log("Document.getInitialState"); 

		return {
			type: "paragraphs"
		};
	},
	getHighest: function(dataset) {
		var max = {
			value: 0, 
			name: ""
		}; 

		for(var i in dataset) {
			if(dataset[i]>max.value) {
				max.name = i; 
				max.value = dataset[i]; 
			}
		}

		return max; 
	}, 
	viewByType: function(type) {
		this.setState({
			type: type
		}); 
	}, 
	render: function() {
		return (
			<div className="app-document">
				<div className="app-document_head">
					<button type="button" disabled={this.state.type=="transcript"} onClick={this.viewByType.bind(null,"transcript")}>Full Transcript</button> 
					<button type="button" disabled={this.state.type=="paragraphs"} onClick={this.viewByType.bind(null,"paragraphs")}>Paragraphs</button> 
					<button type="button" disabled={this.state.type=="sentences"} onClick={this.viewByType.bind(null,"sentences")}>Sentences</button> 
				</div> 
				<div className="app-document_document">
					{this.props.data.speech[this.state.type].map((e,i) => (
						<div className={"app-document_fragment app-document_fragment--"+this.getHighest(e.sentiment).name} key={i}>{e.text}</div>
					))}
				</div> 
			</div>
		); 
	}
}); 
import React from 'react'; 
import Topbar from './Topbar.js'; 
import Sidebar from './Sidebar.js'; 
import Document from './Document.js'; 

module.exports = React.createClass({
	getInitialState: function() {
		var defaultIndex = 0; 

		return {
			data:this.props.data.data, 
			selectedIndex:defaultIndex, 
			selected:this.props.data.data[defaultIndex], 
			ngramData: this.parseNgrams(this.props.data.data[defaultIndex]), 
			sentimentData: this.parseSentiment(this.props.data.data[defaultIndex]) 
		};
	},
	selectSpeech: function(e) {
		this.setState({
			selectedIndex:e.target.value,
			selected: this.state.data[e.target.value],
			ngramData: this.parseNgrams(this.state.data[e.target.value]),
			sentimentData: this.parseSentiment(this.state.data[e.target.value]) 
		}); 
	}, 

	parseNgrams: function(data) {
		var obj = {
			1: iterateData(data.speech.transcript[0].ngrams[1].slice(0,10)), 
			2: iterateData(data.speech.transcript[0].ngrams[2].slice(0,10)), 
			3: iterateData(data.speech.transcript[0].ngrams[3].slice(0,10))
		};

		function iterateData(data) {
			var arr = []; 
			for(var d in data) {
				arr.push({
					name: data[d][0], 
					value: data[d][1]
				})
			}
			return arr; 
		}; 

		return obj; 
	}, 

	parseSentiment: function(data) {
		console.log("App.parseSentiment",data); 
		if(data===undefined) return; 
		var arr = []; 
		data = data.speech.transcript[0].sentiment; 

		for(var d in data) {
			arr.push({
				name: d, 
				value: data[d]
			}); 
		}

		return arr; 
	},

	render: function() {
		console.log("App.render",this.state.selected); 
		return (
			<div>
				<Topbar data={this.state.data} selectSpeech={this.selectSpeech} selectedIndex={this.state.selectedIndex} />
				<Sidebar data={this.state.data} selected={this.state.selected} selectSpeech={this.selectSpeech} selectedIndex={this.state.selectedIndex} ngramData={this.state.ngramData} sentimentData={this.state.sentimentData} />
				<Document data={this.state.data} />
			</div>
		); 
	}
}); 
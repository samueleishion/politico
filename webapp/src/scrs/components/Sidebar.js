import React from 'react'; 
import moment from 'moment'; 
import Graph from './Graph'; 

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data:this.props.data, 
			selected:this.props.selected, 
			selectSpeech:this.props.selectSpeech, 
			selectedIndex:this.props.selectedIndex, 
			ngramData:this.props.ngramData, 
			sentimentData:this.props.sentimentData
		};
	},
	componentWillReceiveProps(nextProps) {
		this.setState(nextProps); 
	}, 
	render: function() {
		return (
			<div className="app-sidebar">
				<div className="app-sidebar_author--profile" style={{"backgroundImage":"url('imgs/"+this.state.selected.author.first.toLowerCase()+this.state.selected.author.last.toLowerCase()+".jpg')"}}></div>
				<div className="app-sidebar_author--name">
					{this.state.selected.author.last}, {this.state.selected.author.first}
				</div> 
				<div className="app-sidebar_author--date">
					{moment.unix(this.state.selected.speech.datetime).format("MMM DD, YYYY")}
				</div> 
				<div className="app-sidebar_speech--sentiment">
					<h3>Sentiment</h3> 
					<Graph id="sentiment" data={this.state.sentimentData} width={300} />
				</div> 
				<div className="app-sidebar_speech--ngrams">
					<span> 
						<h3>Top single words</h3> 
						<Graph id="singlewords" data={this.state.ngramData[1]} width={150} />
					</span> 
					<span>
						<h3>Top pairs of words</h3> 
						<Graph id="doublewords" data={this.state.ngramData[2]} width={150} /> 
					</span> 
				</div> 
			</div>
		); 
	}
}); 
import React from 'react'; 
import moment from 'moment'; 
import {BarChart,XAxis,YAxis,Legend,Tooltip,CartesianGrid,Bar} from 'recharts'; 

module.exports = React.createClass({
	getInitialState: function() {
		console.log("Sidebar.getInitialState"); 

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
		console.log("Sidebar.render",this.state.sentimentData); 
		return (
			<div className="app-sidebar">
				<div className="app-sidebar_author--profile" style={{"backgroundImage":"url('imgs/"+this.state.selected.author.first.toLowerCase()+this.state.selected.author.last.toLowerCase()+".jpg')"}}></div>
				<div className="app-sidebar_author--name">
					{this.state.selected.author.last}, {this.state.selected.author.first}
				</div> 
				<div className="app-sidebar_author--date">
					{moment.unix(this.state.selected.speech.datetime).format("MMM DD, YYYY")}
				</div> 
				<div className="app-sidebar_speech--ngrams">
					<h3>Top single words</h3> 
					<ul>
						{this.state.ngramData[1].map((e,i) => (
							<li key={i}>{e.name} - {e.value}</li>
						))}
					</ul>
					<BarChart width={350} height={150} data={this.state.ngramData[1]}>
						<XAxis dataKey="name" stroke="#999" />
						<YAxis />
						<Tooltip wrapperStyle={{ width: 100, backgroundColor: '#fff' }} />
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<Bar dataKey="value" fill="rgb(0,60,128)" />
					</BarChart> 
					<h3>Top pairs of words</h3> 
					<ul>
						{this.state.ngramData[2].map((e,i) => (
							<li key={i}>{e.name} - {e.value}</li>
						))}
					</ul>
					<BarChart width={350} height={150} data={this.state.ngramData[2]}>
						<XAxis dataKey="name" stroke="#999" />
						<YAxis />
						<Tooltip wrapperStyle={{ width: 100, backgroundColor: '#fff' }} />
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<Bar dataKey="value" fill="rgb(0,60,128)" />
					</BarChart> 
				</div> 
				<div className="app-sidebar_speech--sentiment">
					<h3>Sentiment</h3> 
					<BarChart width={350} height={150} data={this.state.sentimentData}>
						<XAxis dataKey="name" stroke="#999" />
						<YAxis />
						<Tooltip wrapperStyle={{ width: 100, backgroundColor: '#fff' }} />
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<Bar dataKey="value" fill="rgb(0,60,128)" />
					</BarChart> 
				</div> 
			</div>
		); 
	}
}); 
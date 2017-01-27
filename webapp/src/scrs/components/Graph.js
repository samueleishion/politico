import React from 'react'; 

var Graphite = React.createClass({
	getInitialState: function() {
		return {
			rect: null 
		}; 
	}, 
	componentDidMount: function() {
		this.state.rect = d3Chart.create(this.el, {
			id: this.props.id, 
			width: this.props.width, 
			height: 20, 
			value: this.props.data.value/this.props.max*this.props.width, 
			color: this.props.data.name=="pos" ? '#8BC34A' : this.props.data.name=="neutral" ? '#9E9E9E' : this.props.data.name=="neg" ? '#F44336' : '#0D47A1' 
		}, this.state.rect); 
	},
	componentWillReceiveProps(nextProps) {
		d3Chart.update(this.el, {
			value: nextProps.data.value/nextProps.max*nextProps.width 
		}, this.state.rect); 
	}, 
	render: function() {
		return (
			<div ref={(el) => { this.el = el; }}>
				<div className="app-graph_label">{this.props.data.name} ({this.props.data.value})</div> 
				<div className="app-graph_value" id={this.props.id}></div> 
			</div> 
		); 
	}
}); 

// </div> 
module.exports = React.createClass({
	getInitialState: function() {
		return {
		};
	},
	render: function() {
		var max = this.props.id=="sentiment" ? 1 : this.props.data[0].value; 
		return (
			<div className="app-graph" id={this.props.id}>
				{this.props.data.map((e,i) => (
					<Graphite id={this.props.id+"-"+i} data={e} max={max} width={this.props.width} key={i} />
				))}
			</div>
		); 
	}
}); 


// http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
var d3Chart = {};

d3Chart.create = function(el, props, rect) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  svg.append('rect') 
  	  .attr('class', 'd3-rect-background') 
  	  .attr('fill','rgb(245,245,245)')
  	  .attr('width', props.width) 
  	  .attr('height', props.height); 

  rect = svg.append('rect')
    	.attr('class', 'd3-rect')
    	.attr('fill', props.color) 
    	.attr('width',0)
    	.attr('height',props.height);

  this.update(el, props, rect);

  return rect; 
};

d3Chart.update = function(el, props, rect) {
  // Re-compute the scales, and render the data points
  // var scales = this._scales(el, state.domain);
  // this._drawPoints(el, scales, state.data);
  rect.transition()
 	.duration(300)
  	.attr('width',props.value); 

};

d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from 'App'; 
import data from '../data.json'; 

ReactDOM.render(
	<App data={data} />,
	document.getElementById('root')
); 
// ReactDOM.render((
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       // <Route path="speeches" component={Speeches}>
//       // 	<Route path="/speech/:speechId" component={Speech} />
//       // </Route> 
//       // <Route path="authors" component={Users}>
//       //   <Route path="/author/:userId" component={User}/>
//       // </Route>
//       <Route path="*" component={NoMatch}/>
//     </Route>
//   </Router>
// ), document.getElementById('root'))


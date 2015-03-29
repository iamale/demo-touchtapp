/** @jsx React.createElement */

var React = require('react');

require('react-tap-event-plugin')();

var App = React.createClass({
  render: function() {
    return <button onTouchTap={this._handleTouchTap}>Tap Me</button>
  },

  _handleTouchTap: function() {
    alert('Tap');
  }
});


var ready = function() {
  console.log("Device ready");
  React.render(<App />, document.getElementById("app"));
};

if (window.cordova) {
  document.addEventListener('deviceready', ready);
} else {
  document.addEventListener('DOMContentLoaded', ready);
}
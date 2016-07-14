module.exports = React.createClass({
    render: function() {
        return <p>Hello {this.props.name}, today is {this.props.date.toTimeString()}</p>;
    }
});

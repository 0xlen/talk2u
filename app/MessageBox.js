module.exports = React.createClass({
    render: function() {
        return <div className="alert alert-success" role="alert">{this.props.message}</div>;
    }
});

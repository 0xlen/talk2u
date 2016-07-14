module.exports = React.createClass({
    render: function() {
        var messageBox;
        if (this.props.message) {
            messageBox = <div className="alert alert-success" role="alert">{this.props.message}</div>;
        } else {
            messageBox = <div></div>;
        }
        return messageBox;
    }
});

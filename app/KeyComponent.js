module.exports = React.createClass({
    render: function() {
        return (
            <button type="button" onClick={this.props.handleClick} value={this.props.value} className="btn btn-block btn-lg btn-default">
                {this.props.value}
            </button>
        );
    }
});

module.exports = React.createClass({
    render: function() {
        return (
            <div className="input-group">
                <input type="text" value={this.props.value} className="form-control" />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={this.props.clearInput}>Clear</button>
                </span>
            </div>
        );
    }
});

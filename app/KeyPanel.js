var KeyComponent = require('./KeyComponent');

var KeyRow = React.createClass({
    render: function() {
        var row = [];
        for (var i=0; i<3; i++) {
            row.push(
                <div className="col-xs-4">
                    <KeyComponent handleClick={this.props.handleClick} value={this.props.value[i]} />
                </div>
            );
        }

        return (<div className="row">{row}</div>);
    }
});

module.exports = React.createClass({
    handleClick: function(e) {
        this.props.handleClick(e);
    },
    render: function() {
        return (
            <div>
                <KeyRow handleClick={this.handleClick} value={[5, 3, 7]} />
                <KeyRow handleClick={this.handleClick} value={[1, "x", 2]} />
                <KeyRow handleClick={this.handleClick} value={[6, 4, 8]} />
            </div>
        );
    }
});

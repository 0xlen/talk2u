var FirstComponent = require('./ShowTimeComponenet');
var KeyPanel = require('./KeyPanel');
var InputBox = require('./InputBox');

setInterval(function() {
    ReactDOM.render(
        <FirstComponent name="Eason" date={new Date()}>this is my firstComponent</FirstComponent>,
        document.getElementById("infomation")
    );
}, 500);

var App = React.createClass({
    getInitialState: function() {
        return {
            userInput: ''
        };
    },
    handleInputKey: function(e) {
        if (e.target.value != 'x') {
            this.setState({
                userInput: this.state.userInput + e.target.value
            });
        }
    },
    handleClearInput: function(e) {
        this.setState({
            userInput: ''
        });
    },
    render: function() {
        return (
            <div>
                <p className="row"><InputBox value={this.state.userInput} clearInput={this.handleClearInput} /></p>
                <p className="row"><KeyPanel handleClick={this.handleInputKey} /></p>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("panel")
);

var FirstComponent = require('./ShowTimeComponenet');
var MessageBox = require('./MessageBox');
var KeyPanel = require('./KeyPanel');
var InputBox = require('./InputBox');

setInterval(function() {
    ReactDOM.render(
        <FirstComponent name="Eason" date={new Date()}>this is my firstComponent</FirstComponent>,
        document.getElementById("infomation")
    );
}, 500);

var table = null;
$(function() {
    $.ajax({
        url: './table.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            table = data;
        }
    });
});

var App = React.createClass({
    getInitialState: function() {
        return {
            userInput: '',
            message: ''
        };
    },
    handleInputKey: function(e) {
        if (e.target.value != 'x') {
            var newKey = this.state.userInput + e.target.value;
            this.setState({
                userInput: newKey,
                message: table['sentences'][newKey]
            });
        }
    },
    handleClearInput: function(e) {
        this.setState({
            userInput: '',
            message: ''
        });
    },
    render: function() {
        return (
            <div>
                <p className="row"><InputBox value={this.state.userInput} clearInput={this.handleClearInput} /></p>
                <p className="row"><KeyPanel handleClick={this.handleInputKey} /></p>
                <p className="row"><MessageBox message={this.state.message} /></p>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("panel")
);

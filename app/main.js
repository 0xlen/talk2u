var FirstComponent = require('./ShowTimeComponenet');
var MessageBox = require('./MessageBox');
var KeyPanel = require('./KeyPanel');
var InputBox = require('./InputBox');
var AudioTTS = require('./AudioTTS');

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

// speech setup
var supportSpeech = true;
var voiceLang = 'zh-TW';

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
    speak: function(e) {
        if (this.state.message == '' || ! supportSpeech) return;
        var ttsPlayer = document.getElementById("tts");

        if (ttsPlayer != undefined) {
            ttsPlayer.load();
            ttsPlayer.play();
        } else {
            console.log('error')
        }
    },
    render: function() {
        return (
            <div>
                <p className="row"><InputBox value={this.state.userInput} clearInput={this.handleClearInput} /></p>
                <p className="row"><KeyPanel handleClick={this.handleInputKey} /></p>
                <p className="row"><MessageBox message={this.state.message} /></p>
                <p className="row"><button onClick={this.speak} className="btn btn-success btn-lg btn-block">Speak!</button></p>
                <AudioTTS lang={voiceLang} text={this.state.message} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("panel")
);

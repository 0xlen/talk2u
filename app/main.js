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

// speech setup
var synth = window.speechSynthesis;
var supportSpeech = false;
var voices = [], voiceRate = 1, voicePitch = 1, voiceLang = 'zh-TW';
function populateVoiceList() {
    if ($('#langs').length) return;

    voices = synth.getVoices();

    $('body').append('<span>語言: <select id="langs"></select></span>');
    for(var i = 0; i < voices.length ; i++) {
        if (voices[i].lang == voiceLang) supportSpeech = true;
        var selected = (voices[i].lang == voiceLang) ? ' selected' : '';
        $('select').append('<option'+ selected +'>'+ voices[i].lang +'</option>')
    }

    if (! supportSpeech) {
        $('body').append('<div class="alert alert-danger" role="alert">您的裝置不支援語音功能</div>');
    }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
}


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

        var utterThis = new SpeechSynthesisUtterance(this.state.message);
        utterThis.lang  = voiceLang;
        utterThis.pitch = voicePitch;
        utterThis.rate  = voicePitch;
        synth.speak(utterThis);

        utterThis.onpause = function(event) {
            var char = event.utterance.text.charAt(event.charIndex);
            console.log('Speech paused at character ' + event.charIndex + ' of "' +
            event.utterance.text + '", which is "' + char + '".');
        }
    },
    render: function() {
        return (
            <div>
                <p className="row"><InputBox value={this.state.userInput} clearInput={this.handleClearInput} /></p>
                <p className="row"><KeyPanel handleClick={this.handleInputKey} /></p>
                <p className="row"><MessageBox message={this.state.message} /></p>
                <p className="row"><button onClick={this.speak} className="btn btn-success btn-lg btn-block">Speak!</button></p>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("panel")
);

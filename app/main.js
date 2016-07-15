var MessageBox = require('./MessageBox');
var KeyPanel = require('./KeyPanel');
var InputBox = require('./InputBox');
var table = null;

// get table
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
var synth = null;
var supportSpeech = false;
var voices = [], voiceRate = 1, voicePitch = 1, voiceLang = 'zh-TW';

if (!('speechSynthesis' in window)) {
    var msg_zh = '您的裝置不支援語音功能';
    var msg_en = 'Sorry, your device does not support speech function.';
    $('body').append('<div class="alert alert-danger" role="alert">'+ msg_zh + ' ' + msg_en +'</div>');
} else {
    synth = window.speechSynthesis;

    if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = populateVoiceList;
    }
}

function populateVoiceList() {
    if ($('#langs').length || synth == null) return;

    voices = synth.getVoices();

    var supportLang = '<div class="form-group form-group-sm">';
    supportLang += '<label class="control-label col-sm-2">支援語言 Support Langages: </label>';
    supportLang += '<div class="col-sm-10"><select id="langs" class="form-control"></select></div>';
    supportLang += '</div>';
    $('body').append(supportLang);
    for(var i = 0; i < voices.length ; i++) {
        if (voices[i].lang == voiceLang) supportSpeech = true;
        var selected = (voices[i].lang == voiceLang) ? ' selected' : '';
        $('select').append('<option'+ selected +'>'+ voices[i].lang +'</option>')
    }

    if (! supportSpeech) {
        var msg_zh = '您的裝置不支援中文語音';
        var msg_en = 'Sorry, your device does not support chinese voice.';
        $('body').append('<div class="alert alert-danger" role="alert">'+ msg_zh + ' ' + msg_en +'</div>');
    }
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
        } else if (e.target.value == 'x') {
            this.handleClearInput(null);
        }
    },
    handleClearInput: function(e) {
        this.setState({
            userInput: '',
            message: ''
        });
    },
    speak: function(e) {
        if (this.state.message == '' || ! supportSpeech || synth == null) return;

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

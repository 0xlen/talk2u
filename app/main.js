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

$(document).on('click', '#switchNav li a', function(e) {
    var $_text = $(e.target).data('index') == undefined ?
                 $(e.target).parent('a').text() :
                 $(e.target).text();

    $('#switchNav li').removeClass('active');
    $(e.target).parents('li').addClass('active');
    $('#functionDropdown small').text($_text)

    populateVoiceList();
});

// speech setup
var synth = null;
var supportSpeech = false;
var voices = [], voiceRate = 1, voicePitch = 1,
    voiceLang = {
        'en' : ['en-US', 'en_US'],
        'zh' : ['zh-TW', 'zh_TW']
    };

if (!('speechSynthesis' in window)) {
    var msg_zh = '您的裝置不支援語音功能';
    var msg_en = 'Sorry, your device does not support speech function.';
    $('body').append('<div class="alert alert-danger" role="alert">'+ msg_zh + ' ' + msg_en +'</div>');
} else {
    synth = window.speechSynthesis;

    var supportLang = '<div class="form-group form-group-sm">';
    supportLang += '<label class="control-label col-sm-2">支援語言 Support Langages: </label>';
    supportLang += '<div class="col-sm-10"><select id="langs" class="form-control"></select></div>';
    supportLang += '</div>';
    $('body').append(supportLang);

    if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = populateVoiceList;
    }
}

function populateVoiceList() {
    if (synth == null) return;

    // get support voices
    if (voices.length <= 0) voices = synth.getVoices();
    if ($('#langs option').length <= 0 && voices.length > 0) {
        for(var i = 0; i < voices.length; i++) {
            $('#langs').append('<option val='+ voices[i].lang +'>'+ voices[i].lang +'</option>')
        }
    }

    supportSpeech = false;
    var functionLang = $('#switchNav li.active a').data('lang');

    if ( functionLang != undefined ) {
        for (var i = 0; i< voices.length; i++) {
            var index = $.inArray(voices[i].lang, voiceLang[functionLang]);
            if ( index > -1 ) {
                supportSpeech = true;
                $('#langs')[0].selectedIndex = i;
                $('#langs').trigger('change');
            }
        }
    } else {
    }

    if (voices.length > 0 && ! supportSpeech) {
        var msg_zh = '您的裝置不支援該語言的語音';
        var msg_en = 'Sorry, your device does not support this voice.';
        var closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        closeButton    += '<span aria-hidden="true">&times;</span>';
        closeButton    += '</button>';

        $('#infomation').prepend('<div class="alert alert-danger alert-dismissible fade in" role="alert">'+ closeButton + msg_zh + ' ' + msg_en +'</div>');
    }
}

populateVoiceList();

var App = React.createClass({
    getInitialState: function() {
        return {
            userInput: '',
            message: '',
            autoPlay: false
        };
    },
    handleInputKey: function(e) {
        if (e.target.value != 'x') {
            var newKey = this.state.userInput + e.target.value;
            var currentIndex = $('#switchNav li.active a').data('index');

            this.setState({
                userInput: newKey,
                message: table[currentIndex][newKey]
            },
            function() {
                if (this.state.autoPlay) {
                    this.speak(null);
                }
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
        utterThis.lang  = $('#langs').val();
        utterThis.pitch = voicePitch;
        utterThis.rate  = voiceRate;
        synth.speak(utterThis);

        utterThis.onpause = function(event) {
            var char = event.utterance.text.charAt(event.charIndex);
            console.log('Speech paused at character ' + event.charIndex + ' of "' +
            event.utterance.text + '", which is "' + char + '".');
        }
    },
    handleAutoPlay: function(e) {
        this.setState({ autoPlay: e.target.checked });
    },
    render: function() {
        return (
            <div>
                <p className="row"><InputBox value={this.state.userInput} clearInput={this.handleClearInput} /></p>
                <p className="row"><KeyPanel handleClick={this.handleInputKey} /></p>
                <p className="row"><MessageBox message={this.state.message} /></p>
                <p className="row"><button onClick={this.speak} className="btn btn-success btn-lg btn-block">Speak!</button></p>
                <p className="row text-center">
                    <input type="checkbox" checked={this.state.autoPlay} onChange={this.handleAutoPlay} /><label> 自動播放 Auto play</label>
                </p>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("panel")
);

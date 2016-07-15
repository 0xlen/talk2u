var tts = 'http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob'
module.exports = React.createClass({
    render: function() {
        if (this.props.text == '' || this.props.text == undefined) return <audio rel="noreferrer"></audio>;

        var langs = '&tl=' + this.props.lang;
        var query = '&q=' + encodeURIComponent(this.props.text);
        var link  = tts + langs + query;

        return <audio type="audio/mpeg" src={link} id="tts" rel="noreferrer"></audio>;
    }
});

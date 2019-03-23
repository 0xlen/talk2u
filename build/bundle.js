!function(e){function t(n){if(a[n])return a[n].exports;var s=a[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function n(){if(null!=u){if(d.length<=0&&(d=u.getVoices()),$("#langs option").length<=0&&d.length>0)for(var e=0;e<d.length;e++)$("#langs").append("<option val="+d[e].lang+">"+d[e].lang+"</option>");p=!1;var t=$("#switchNav li.active a").data("lang");if(void 0!=t)for(var e=0;e<d.length;e++){var a=$.inArray(d[e].lang,v[t]);a>-1&&(p=!0,$("#langs")[0].selectedIndex=e,$("#langs").trigger("change"))}if(d.length>0&&!p){var n="您的裝置不支援該語言的語音",s="Sorry, your device does not support this voice.",l='<button type="button" class="close" data-dismiss="alert" aria-label="Close">';l+='<span aria-hidden="true">&times;</span>',l+="</button>",$("#infomation").prepend('<div class="alert alert-danger alert-dismissible fade in" role="alert">'+l+n+" "+s+"</div>")}}}var s=a(4),l=a(3),c=a(1),r=2,i=["zh_pinyin","en_phonetic"],o=null;$(function(){$.ajax({url:"./table.json",type:"GET",dataType:"json",success:function(e){o=e}})}),$(document).on("click","#switchNav li a",function(e){var t=void 0==$(e.target).data("index")?$(e.target).parent("a").text():$(e.target).text();$("#switchNav li").removeClass("active"),$(e.target).parents("li").addClass("active"),$("#functionDropdown small").text(t),n()});var u=null,p=!1,d=[],h=1,m=1,v={en:["en-US","en_US"],zh:["zh-TW","zh_TW"]};if("speechSynthesis"in window){u=window.speechSynthesis;var g='<div class="form-group form-group-sm">';g+='<label class="control-label col-sm-2">支援語言 Support Langages: </label>',g+='<div class="col-sm-10"><select id="langs" class="form-control"></select></div>',g+="</div>",$("body").append(g),void 0!==speechSynthesis.onvoiceschanged&&(speechSynthesis.onvoiceschanged=n)}else{var f="您的裝置不支援語音功能",y="Sorry, your device does not support speech function.";$("body").append('<div class="alert alert-danger" role="alert">'+f+" "+y+"</div>")}n();var R=React.createClass({displayName:"App",getInitialState:function(){return{userInput:"",message:"",autoPlay:!1}},handleInputKey:function(e){if("x"!=e.target.value){var t=this.state.userInput.length>=r?e.target.value:this.state.userInput+e.target.value,a=$("#switchNav li.active a").data("index"),n=null;n=$.inArray(a,i)>-1?void 0!=o[a][t]?this.state.message+o[a][t]:this.state.message:o[a][t],this.setState({userInput:t,message:n},function(){this.state.autoPlay&&void 0!=o[a][t]&&this.speak(null)})}else"x"==e.target.value&&this.handleClearInput(null)},handleClearInput:function(e){this.setState({userInput:"",message:""})},speak:function(e){if(""!=this.state.message&&p&&null!=u){var t=$("#switchNav li.active a").data("index"),a=$.inArray(t,i)>-1?this.state.message.slice(-1):this.state.message,n=new SpeechSynthesisUtterance(a);n.lang=$("#langs").val(),n.pitch=m,n.rate=h,u.speak(n),n.onpause=function(e){var t=e.utterance.text.charAt(e.charIndex);console.log("Speech paused at character "+e.charIndex+' of "'+e.utterance.text+'", which is "'+t+'".')}}},handleAutoPlay:function(e){this.setState({autoPlay:e.target.checked})},render:function(){return React.createElement("div",null,React.createElement("p",{className:"row"},React.createElement(c,{value:this.state.userInput,clearInput:this.handleClearInput})),React.createElement("p",{className:"row"},React.createElement(l,{handleClick:this.handleInputKey})),React.createElement("p",{className:"row"},React.createElement(s,{message:this.state.message})),React.createElement("p",{className:"row"},React.createElement("button",{onClick:this.speak,className:"btn btn-success btn-lg btn-block"},"Speak!")),React.createElement("p",{className:"row text-center"},React.createElement("input",{type:"checkbox",checked:this.state.autoPlay,onChange:this.handleAutoPlay}),React.createElement("label",null," 自動播放 Auto play")))}});ReactDOM.render(React.createElement(R,null),document.getElementById("panel"))},function(e,t){"use strict";e.exports=React.createClass({displayName:"exports",render:function(){return React.createElement("div",{className:"input-group"},React.createElement("input",{type:"text",value:this.props.value,className:"form-control"}),React.createElement("span",{className:"input-group-btn"},React.createElement("button",{className:"btn btn-default",type:"button",onClick:this.props.clearInput},"Clear")))}})},function(e,t){"use strict";e.exports=React.createClass({displayName:"exports",render:function(){return React.createElement("button",{type:"button",onClick:this.props.handleClick,value:this.props.value,className:"btn btn-block btn-lg btn-default"},this.props.value)}})},function(e,t,a){"use strict";var n=a(2),s=React.createClass({displayName:"KeyRow",render:function(){for(var e=[],t=0;t<3;t++)e.push(React.createElement("div",{className:"col-xs-4"},React.createElement(n,{handleClick:this.props.handleClick,value:this.props.value[t]})));return React.createElement("div",{className:"row"},e)}});e.exports=React.createClass({displayName:"exports",handleClick:function(e){this.props.handleClick(e)},render:function(){return React.createElement("div",null,React.createElement(s,{handleClick:this.handleClick,value:[5,3,7]}),React.createElement(s,{handleClick:this.handleClick,value:[1,"x",2]}),React.createElement(s,{handleClick:this.handleClick,value:[6,4,8]}))}})},function(e,t){"use strict";e.exports=React.createClass({displayName:"exports",render:function(){var e;return e=this.props.message?React.createElement("div",{className:"alert alert-success",role:"alert"},this.props.message):React.createElement("div",null)}})}]);
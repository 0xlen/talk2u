!function(e){function t(n){if(a[n])return a[n].exports;var s=a[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";var n=a(5),s=a(4),c=a(3),r=a(1);setInterval(function(){ReactDOM.render(React.createElement(n,{name:"Eason",date:new Date},"this is my firstComponent"),document.getElementById("infomation"))},500);var l=null;$(function(){$.ajax({url:"./table.json",type:"GET",dataType:"json",success:function(e){l=e}})});var i=window.speechSynthesis,u=1,o="zh-TW",p=React.createClass({displayName:"App",getInitialState:function(){return{userInput:"",message:""}},handleInputKey:function(e){if("x"!=e.target.value){var t=this.state.userInput+e.target.value;this.setState({userInput:t,message:l.sentences[t]})}},handleClearInput:function(e){this.setState({userInput:"",message:""})},speak:function(e){if(""!=this.state.message){var t=new SpeechSynthesisUtterance(this.state.message);t.lang=o,t.pitch=u,t.rate=u,i.speak(t),t.onpause=function(e){var t=e.utterance.text.charAt(e.charIndex);console.log("Speech paused at character "+e.charIndex+' of "'+e.utterance.text+'", which is "'+t+'".')}}},render:function(){return React.createElement("div",null,React.createElement("p",{className:"row"},React.createElement(r,{value:this.state.userInput,clearInput:this.handleClearInput})),React.createElement("p",{className:"row"},React.createElement(c,{handleClick:this.handleInputKey})),React.createElement("p",{className:"row"},React.createElement(s,{message:this.state.message})),React.createElement("p",{className:"row"},React.createElement("button",{onClick:this.speak,className:"btn btn-success btn-lg btn-block"},"Speak!")))}});ReactDOM.render(React.createElement(p,null),document.getElementById("panel"))},function(e,t){"use strict";e.exports=React.createClass({displayName:"exports",render:function(){return React.createElement("div",{className:"input-group"},React.createElement("input",{type:"text",value:this.props.value,className:"form-control"}),React.createElement("span",{className:"input-group-btn"},React.createElement("button",{className:"btn btn-default",type:"button",onClick:this.props.clearInput},"Clear")))}})},function(e,t){"use strict";e.exports=React.createClass({displayName:"exports",render:function(){return React.createElement("button",{type:"button",onClick:this.props.handleClick,value:this.props.value,className:"btn btn-block btn-lg btn-default"},this.props.value)}})},function(e,t,a){"use strict";var n=a(2),s=React.createClass({displayName:"KeyRow",render:function(){for(var e=[],t=0;t<3;t++)e.push(React.createElement("div",{className:"col-xs-4"},React.createElement(n,{handleClick:this.props.handleClick,value:this.props.value[t]})));return React.createElement("div",{className:"row"},e)}});e.exports=React.createClass({displayName:"exports",handleClick:function(e){this.props.handleClick(e)},render:function(){return React.createElement("div",null,React.createElement(s,{handleClick:this.handleClick,value:[5,3,7]}),React.createElement(s,{handleClick:this.handleClick,value:[1,"x",2]}),React.createElement(s,{handleClick:this.handleClick,value:[6,4,8]}))}})},function(e,t){"use strict";e.exports=React.createClass({displayName:"exports",render:function(){var e;return e=this.props.message?React.createElement("div",{className:"alert alert-success",role:"alert"},this.props.message):React.createElement("div",null)}})},function(e,t){"use strict";e.exports=React.createClass({displayName:"exports",render:function(){return React.createElement("p",null,"Hello ",this.props.name,", today is ",this.props.date.toTimeString())}})}]);
var message = $('#floatingInput');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = '#JSGF V1.0';

var recognition = new SpeechRecognition();
var speechRecognitionGrammarList = new SpeechGrammarList();
speechRecognitionGrammarList.addFromString(grammar, 1);

recognition.grammars = SpeechRecognitionGrammarList;
recognition.lang = 'en-US';
recognition.interimResults = false;//we dont want interim results instead final one

// onresult
// onspeechend
// onerror

recognition.onresult = function(event){
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;

}


recognition.onspeechend = function(){
 recognition.stop();
}


recongnition.onerror = function(){
    message.textContent = 'Error occured in recognition' + event.error;
}

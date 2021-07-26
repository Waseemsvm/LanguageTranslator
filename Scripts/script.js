$('document').ready(function(){    

    let input = "";
    let langCodes = {};

    //get the data of the languages from the json file
    $.getJSON("scripts/languages.json", function(data){
        
        //get the language and respective language code and add to the langCodes object
        data.map(item=>{
            var language = item['English'];
            var code = item['alpha2'];
            langCodes[language] = code;
        });

        //if the langCodes array is populated then proceed
        if(langCodes){

            //get the list of language names to append to the options of the select
            let languageslist = document.getElementById('languages');

            //get the list of language codes to append to the value attribute of the options
            let langCodeskeys = Object.keys(langCodes);
            
            //create the options to append to the select element
            for(let i = 0; i<langCodeskeys.length; i++){

                //create the option element 
                var option = document.createElement('option');

                //assign the language codes to the value attribute
                option.value = langCodeskeys[i];

                //assign the language names to the innerHTML
                option.innerHTML = langCodeskeys[i];

                //append the option element to the options of select element
                languageslist.appendChild(option);
            }
        }
    });

        //speech to text   
              
        
        //on clicking the mic button on
        $('#mic').click(function(){

            // new speech recognition object
            var SpeechRecognition =  webkitSpeechRecognition || SpeechRecognition;
            var recognition = new SpeechRecognition();
                        
            // This runs when the speech recognition service starts
            recognition.onstart = function() {
                console.log("We are listening. Try speaking into the microphone.");
            };

            recognition.onspeechend = function() {
                // when user is done speaking
                recognition.stop();
            }
                        
            // This runs when the speech recognition service returns result
            recognition.onresult = function(event) {
                var transcript = event.results[0][0].transcript;
                var confidence = event.results[0][0].confidence;
                document.getElementById('floatingInput').value = transcript;
                console.log(transcript);

            };
            recognition.start();
        });



    //on click of translate button the input text is translated and sent to the output box
    $('#translateBtn').click(function(e){

        //get the input from the text box
        input = $("#floatingInput").val();

        //declare the output variable to append to the textbox
        output ="";
        let lang = langCodes[document.getElementById('languages').value] || "en";
        if(!input){
            input = "Hello world";
            document.getElementById('floatingInput').value = input;
        }

        //convert the input to the queryString format
        encodedInput = encodeURI(input);

        //if input is set then proceed 
        if(input){
            
            //set the language value

            let language = document.getElementById('languages').value;

            //if the language value is set then assign the value to the lang property
            if(language){
                lang = langCodes[language]; 
                console.log("language : " + lang);
            }else{
                //else set the lang to english as default
                lang = "en";
            }


            //send the request for the translation to the justTranslated API
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://just-translated.p.rapidapi.com/?lang="+lang+"&text="+encodedInput,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "17176844c6mshd4ef9493926833cp1f5557jsn54d6578bd43c",
                    "x-rapidapi-host": "just-translated.p.rapidapi.com"
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response.text);

                //assign the translatedText to the output element
                let translatedText = response.text[0];
                document.getElementById('output').value = translatedText;
                //response.text[0] = "";

                // convert text to audio
                if(translatedText){
                    let speech = new SpeechSynthesisUtterance();
                    let voices = window.speechSynthesis.getVoices();
                    speech.lang = "en";
                    speech.text = response.text[0];
                    window.speechSynthesis.speak(speech);
                }               
                

            });        






        }
           
    });

});




/**
 * Created by Marian on 5/11/2015.
 */

var Speech = function() {

    this.langs =
        [
            ['Afrikaans',
                ['af-ZA']
            ],
            ['Bahasa Indonesia',
                ['id-ID']
            ],
            ['Bahasa Melayu',
                ['ms-MY']
            ],
            ['Català',
                ['ca-ES']
            ],
            ['?eština',
                ['cs-CZ']
            ],
            ['Deutsch',
                ['de-DE']
            ],
            ['English',
                ['en-AU', 'Australia'],
                ['en-CA', 'Canada'],
                ['en-IN', 'India'],
                ['en-NZ', 'New Zealand'],
                ['en-ZA', 'South Africa'],
                ['en-GB', 'United Kingdom'],
                ['en-US', 'United States']
            ],
            ['Español',
                ['es-AR', 'Argentina'],
                ['es-BO', 'Bolivia'],
                ['es-CL', 'Chile'],
                ['es-CO', 'Colombia'],
                ['es-CR', 'Costa Rica'],
                ['es-EC', 'Ecuador'],
                ['es-SV', 'El Salvador'],
                ['es-ES', 'España'],
                ['es-US', 'Estados Unidos'],
                ['es-GT', 'Guatemala'],
                ['es-HN', 'Honduras'],
                ['es-MX', 'México'],
                ['es-NI', 'Nicaragua'],
                ['es-PA', 'Panamá'],
                ['es-PY', 'Paraguay'],
                ['es-PE', 'Perú'],
                ['es-PR', 'Puerto Rico'],
                ['es-DO', 'República Dominicana'],
                ['es-UY', 'Uruguay'],
                ['es-VE', 'Venezuela']
            ],
            ['Euskara',
                ['eu-ES']
            ],
            ['Français',
                ['fr-FR']
            ],
            ['Galego',
                ['gl-ES']
            ],
            ['Hrvatski',
                ['hr_HR']
            ],
            ['IsiZulu',
                ['zu-ZA']
            ],
            ['Íslenska',
                ['is-IS']
            ],
            ['Italiano',
                ['it-IT', 'Italia'],
                ['it-CH', 'Svizzera']
            ],
            ['Magyar',
                ['hu-HU']
            ],
            ['Nederlands',
                ['nl-NL']
            ],
            ['Norsk bokmål',
                ['nb-NO']
            ],
            ['Polski',
                ['pl-PL']
            ],
            ['Português',
                ['pt-BR', 'Brasil'],
                ['pt-PT', 'Portugal']
            ],
            ['Român?',
                ['ro-RO']
            ],
            ['Sloven?ina',
                ['sk-SK']
            ],
            ['Suomi',
                ['fi-FI']
            ],
            ['Svenska',
                ['sv-SE']
            ],
            ['Türkçe',
                ['tr-TR']
            ],
            ['?????????',
                ['bg-BG']
            ],
            ['P??????',
                ['ru-RU']
            ],
            ['??????',
                ['sr-RS']
            ],
            ['???',
                ['ko-KR']
            ],
            ['??',
                ['cmn-Hans-CN', '??? (????)'],
                ['cmn-Hans-HK', '??? (??)'],
                ['cmn-Hant-TW', '?? (??)'],
                ['yue-Hant-HK', '?? (??)']
            ],
            ['???',
                ['ja-JP']
            ],
            ['Lingua lat?na',
                ['la']
            ]
        ];
    this.selectedLanguageIndex = 6;
    this.selectedDialectIndex = 7;
    this.finalTranscript = '';
    this.recognizing = false;
    this.ignoreOnend = false;
    this.startTimestamp = null;
    this.recognition = null;
    this.interimResult = null;
    this.finalResult = null;
    this.onStart = null;
    this.onEnd = null;
    this.onError = null;
    this.onResult = null;
    this.onResCounter = 0;
};

Speech.prototype.init = function(){
    if (!('webkitSpeechRecognition' in window)) {
        alert('Web Speech API is not supported by this browser. ' +
              'Upgrade to Chrome version 25 or later.');
    } else {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
    }
};

Speech.prototype.start = function() {
    if (this.recognizing) {
        this.recognition.stop();
        return;
    }
    this.finalTranscript = '';
    this.recognition.lang = this.langs[this.selectedLanguageIndex][this.selectedDialectIndex];
    this.recognition.start();
    this.ignoreOnend = false;
    this.interimResult = '';
    this.finalResult = '';
};

Speech.prototype.onStartCallback = function() {
    this.recognizing = true;
    //if ( window.console && window.console.log ) {
    //    window.console.log('Start...');
    //}
    this.onStart();
};

Speech.prototype.registerOnStart = function(onStartFunction) {
    this.onStart = onStartFunction;
    var obj = this;
    this.recognition.onstart = function(){obj.onStartCallback(event)};
};

Speech.prototype.onErrorCallback = function(event) {
    //if ( window.console && window.console.log ) {
    //    window.console.log('Error: ' + event);
    //}
    this.onError(event);
    ignore_onend = true;
};

Speech.prototype.registerOnError = function(onErrorFunction) {
    this.onError = onErrorFunction;
    var obj = this;
    this.recognition.onerror = function(event){obj.onErrorCallback(event)};
};

Speech.prototype.onEndCallback = function() {
    this.recognizing = false;
    //if ( window.console && window.console.log ) {
    //    window.console.log('End...');
    //}
    if (this.ignore_onend) {
        return;
    }
    this.onEnd();
};

Speech.prototype.registerOnEnd = function(onEndFunction) {
    this.onEnd = onEndFunction;
    var obj = this;
    this.recognition.onend = function(){obj.onEndCallback()};
};

Speech.prototype.onResultCallback = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        this.onResCounter++;
        if (event.results[i].isFinal) {
            this.onResCounter = 0;
            hideProgressbar();
            this.onResult(event.results[i][0].transcript);
        } else {
            if (this.onResCounter > 10) {
                showProgressbar();
            }
        }
    }
};

Speech.prototype.registerOnResult = function(onResultFunction) {
    this.onResult = onResultFunction;
    var obj = this;
    this.recognition.onresult = function(event){obj.onResultCallback(event)};
};

Speech.prototype.isCommand = function(token) {
    for (var i = 0; i < this.stateMachine[this.state].length; ++i) {
        if (this.commands[this.stateMachine[this.state][i]] == token) {
            this.state = this.stateMachine[this.state][i];
            //if ( window.console && window.console.log ) {
            //    window.console.log('Command ' + token + ' matched -> state:' + this.state);
            //}
            return true;
        }
    }
    return false;
};
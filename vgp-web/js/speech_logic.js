/**
 * Created by Marian on 5/12/2015.
 */

var SpeechApplication = function(commandParser) {
    this.speech = new Speech();
    this.micNormalSrc = '';
    this.micAnimatedSrc = '';
    this.micStoppedSrc = '';
    this.micButton = null;
    this.outputBox = null;
    this.currentCommand = '';
    this.cmdParser = commandParser;
    this.cmdParserStream = new CommandParserStream(this.cmdParser);
};

SpeechApplication.prototype.init = function(){
    this.speech.init();
    var obj = this;
    this.speech.registerOnStart(function(){obj.onStart()});
    this.speech.registerOnError(function(event){obj.onError(event)});
    this.speech.registerOnEnd(function(){obj.onEnd()});
    this.speech.registerOnResult(function(event){obj.onResult(event)});
};

SpeechApplication.prototype.toogleOnOff = function() {
    this.speech.start();
};

SpeechApplication.prototype.setMicButtonId = function(id) {
    this.micButton = id;
};

SpeechApplication.prototype.ClearMicButtonId = function() {
    this.micButton = null;
};

SpeechApplication.prototype.setOutputBoxId = function(id) {
    this.outputBox = id;
};

SpeechApplication.prototype.ClearOutputBoxId = function() {
    this.outputBox = null;
};

SpeechApplication.prototype.setMicImageSources = function(normal, animated, stopped) {
    this.micNormalSrc = normal;
    this.micAnimatedSrc = animated;
    this.micStoppedSrc = stopped;
};

SpeechApplication.prototype.onStart = function() {
    if (this.micButton != null) {
        this.micButton.innerHTML = "Listening";
    }
    this.cmdParserStream.reset();
};

SpeechApplication.prototype.onEnd = function() {
    if (this.micButton != null) {
        this.micButton.innerHTML = "Listen";
    }
    if (this.outputBox != null) {
        this.outputBox.value = ' ';
    }
    this.currentCommand = '';
    this.cmdParserStream.reset();
};

SpeechApplication.prototype.onResult = function(phrase) {
    var cmdFinished = this.cmdParserStream.process(phrase);
    if (this.outputBox != null) {
        this.outputBox.value = this.cmdParserStream.getCommand();
    }
    if (cmdFinished) {
        app.parseAndExecute(this.cmdParserStream.getCommand());
        this.cmdParserStream.reset();
    }
};

SpeechApplication.prototype.onError = function(event) {
    if (event.error == 'no-speech') {
        if (this.micButton != null) {
            this.micButton.innerHTML = "Listen";
        }
        alert('No speech was detected. You may need to adjust your microphone settings.');
    }
    if (event.error == 'audio-capture') {
        if (this.micButton != null) {
            this.micButton.innerHTML = "Listen";
        }
        alert('No microphone was found. Ensure that a microphone is installed and that' +
              'microphone settings are configured correctly.');
    }
    if (event.error == 'not-allowed') {
        alert('Permission to use microphone is blocked or denied.');
    }
};
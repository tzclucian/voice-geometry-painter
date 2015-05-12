/**
 * Created by Marian on 5/12/2015.
 */

var SpeechApplication = function() {
    this.speech = new Speech();
    this.micNormalSrc = '';
    this.micAnimatedSrc = '';
    this.micStoppedSrc = '';
    this.micImg = null;
    this.outputBox = null;
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

SpeechApplication.prototype.setMicImgId = function(id) {
    this.micImg = id;
};

SpeechApplication.prototype.ClearMicImgId = function() {
    this.micImg = null;
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
    if (this.micImg != null) {
        this.micImg.src = this.micAnimatedSrc;
    }
};

SpeechApplication.prototype.onEnd = function() {
    if (this.micImg != null) {
        this.micImg.src = this.micNormalSrc;
    }
};

SpeechApplication.prototype.onResult = function(phrase) {
    if (this.outputBox != null) {
        this.outputBox.value = phrase;
    }
};

SpeechApplication.prototype.onError = function(event) {
    if (event.error == 'no-speech') {
        if (this.micImg != null) {
            this.micImg.src = this.micStoppedSrc;
        }
        alert('No speech was detected. You may need to adjust your microphone settings.');
    }
    if (event.error == 'audio-capture') {
        if (this.micImg != null) {
            this.micImg.src = this.micStoppedSrc;
        }
        alert('No microphone was found. Ensure that a microphone is installed and that' +
              'microphone settings are configured correctly.');
    }
    if (event.error == 'not-allowed') {
        alert('Permission to use microphone is blocked or denied.');
    }
};
/**
 * Created by Marian on 5/25/2015.
 */

var CommandParserStream = function(commandParser) {
    this.cmdParser = commandParser;
    this.stmTokenList = [];
    this.stateMachineTransitions = [];
    this.currentState = 0;
    this.command = "";
    this.initStateMachine();
    //this.printTokens();
    //this.printTransitionTable();
};

CommandParserStream.prototype.reset = function() {
    this.currentState = 0;
    this.command = "";
};

CommandParserStream.prototype.initStateMachine = function()
{
    var commands = this.cmdParser.getCommands();
    this.stmTokenList.push("");
    for (var i = 0; i < commands.length; i++) {
        this.registerCommand(commands[i]);
    }
};

CommandParserStream.prototype.registerCommand = function(commandDefinition) {
    if (commandDefinition instanceof CommandDefinition) {
        var regexp = commandDefinition.regexp.toString();
        var cleanRegexp = regexp.substring(1, regexp.length-1);
        if (cleanRegexp.lastIndexOf('/') == (cleanRegexp.length-1)) {
            cleanRegexp = cleanRegexp.substring(0, cleanRegexp.length-1);
        }
        //console.log("Parsing: " + cleanRegexp);
        var regexpTokens = cleanRegexp.split("\\s");
        var state = this.getLastMatchedToken(regexpTokens);
        for (var j = 0; j < regexpTokens.length; j++) {
            var index = this.registerToken(regexpTokens[j]);
            var transition = [state];
            this.stmAddTransition(state, index);
            state = index;
        }
    }
}

CommandParserStream.prototype.getLastMatchedToken = function(tokens) {
    var state = 0;
    for (var i = 0; i < tokens.length; i++) {

        var nextState = this.getNextState(state, tokens[i], true);
        //console.log("getLastMatchedToken --> " + tokens[i] + ", nextState=" + nextState);
        if (nextState > 0) {
            state = nextState;
            tokens.shift();
        } else {
            break;
        }
    }
    return state;
};

CommandParserStream.prototype.registerToken = function(token) {
    this.stmTokenList.push(token);
    return this.stmTokenList.length-1;
};

CommandParserStream.prototype.getToken = function(index) {
    return this.stmTokenList[index];
};

CommandParserStream.prototype.stmAddTransition = function(state, index) {
    if (state >= this.stateMachineTransitions.length) {
        for (var i = this.stateMachineTransitions.length; i <= state; i++ ) {
            this.stateMachineTransitions.push(new Array());
        }
    }
    if (index >= this.stateMachineTransitions.length) {
        for (var i = this.stateMachineTransitions.length; i <= index; i++ ) {
            this.stateMachineTransitions.push(new Array());
        }
    }
    //Skip transition if it already exists
    for (var i = 0; i < this.stateMachineTransitions[state].length; i++) {
        if (this.stateMachineTransitions[state][i] == index) {
            return;
        }
    }
    //Add transition
    this.stateMachineTransitions[state].push(index);
};

CommandParserStream.prototype.process = function(phrase) {
    console.log("Speech Processing: " + phrase);
    var tokens = phrase.split(" ");
    for (var i = 0; i < tokens.length; i++) {
        var nextState = this.getNextState(this.currentState, tokens[i], false);
        if (nextState > 0) {
            this.command += " " + tokens[i];
            this.currentState = nextState;
            if (this.isEndState(this.currentState)) {
                return true;
            }
        }
    }
    return false;
};

//search for a match in the transition list of a state
CommandParserStream.prototype.getNextState = function(state, token, isRegexpToken) {
    if (this.stateMachineTransitions.length == 0) {
        return -1;
    }
    if (!isRegexpToken) {
        for (var i = 0; i < this.stateMachineTransitions[state].length; i++) {
            var regexpStr = this.getToken(this.stateMachineTransitions[state][i]);
            var re = new RegExp("^" + regexpStr + "$","i");
            if (re.exec(token) != null) {
                return this.stateMachineTransitions[state][i];
            }
        }
        return -1;
    }
    else {
        for (var i = 0; i < this.stateMachineTransitions[state].length; i++) {
            var regexp = this.getToken(this.stateMachineTransitions[state][i]);
            if (token == regexp) {
                return this.stateMachineTransitions[state][i];
            }
        }
        return -1;
    }
};

CommandParserStream.prototype.isEndState = function(state) {
    return this.stateMachineTransitions[state].length == 0;
};

CommandParserStream.prototype.getCommand = function() {
    return this.command;
};

CommandParserStream.prototype.printTransitionTable = function() {
    for (var i = 0; i < this.stateMachineTransitions.length; i++) {
        var line = "" + i + " -> ";
        for (var j = 0; j < this.stateMachineTransitions[i].length-1; j++) {
            line += this.stateMachineTransitions[i][j] + ", ";
        }
        line += this.stateMachineTransitions[i][this.stateMachineTransitions[i].length-1];
        console.log(line);
    }
};

CommandParserStream.prototype.printTokens = function() {
    var line = "";
    for (var i = 0; i < this.stmTokenList.length; i++) {
        line += i + ":" + this.stmTokenList[i] + ", ";
    }
    console.log(line);
}
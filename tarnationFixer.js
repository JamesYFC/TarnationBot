const fs = require('fs');

const censoredPhrases = require("./data/censored-phrases.json")

module.exports.Fixer = class Fixer {
    constructor() {}
    
    checkForBadPhrases(string) {
        let result = string.toLowerCase();
        for (let i = 0; i < Object.keys(censoredPhrases).length; i++)
        {
            if (string.includes(Object.keys(censoredPhrases)[i])) return true
        }
        return false;
    }

    replaceBadPhrases(string) {
        let result = string.toLowerCase();
        Object.keys(censoredPhrases)
            .forEach(phrase => result = result.split(phrase).join(censoredPhrases[phrase]));
        return result;
    }
}



const fs = require('fs');

module.exports.Fixer = class Fixer {

    constructor(censoredPhrases) {
        this.specialCharExp = /[\.\^\$\*\+\?\(\)\[\{\\\|\-]/;
        this.globalSpecialCharExp = new RegExp(this.specialCharExp, 'g');
        
        this.censoredPhrases = censoredPhrases;
        this.verifyPhrases();
    }

    verifyPhrases()
    {
        for (const phraseKey in this.censoredPhrases)
        {
            //console.log(`Key: ${key}, Value: ${this.censoredPhrases[key]}`)
            if (this.specialCharExp.test(phraseKey))
            {
                //console.log('found special chars!')
                let newPhraseKey = phraseKey.replace(this.globalSpecialCharExp, "")
                this.censoredPhrases[newPhraseKey] = this.censoredPhrases[phraseKey]
                //console.log(`Deleted old key. New key: ${newPhraseKey}`)
                delete this.censoredPhrases[phraseKey];
            }
        }

        console.log('Verified phrases.')
        /*
        console.log('final results:')
        for (const phraseKey in this.censoredPhrases)
        {
            console.log(`Key: ${phraseKey}, Value: ${this.censoredPhrases[phraseKey]}`)
        }
        */
    }

    checkForBadPhrases(string) {
        let result = string.toLowerCase();

        for (let i = 0; i < Object.keys(this.censoredPhrases).length; i++)
        {
            if (result.includes(Object.keys(this.censoredPhrases)[i])) return true
        }

        return false;
    }

    replaceBadPhrases(string) {
        let result = string.toLowerCase();

        for (const phraseKey in this.censoredPhrases)
        {
            result = result.replace(new RegExp(phraseKey, 'g'), this.censoredPhrases[phraseKey]);
        }

        return result;
    }
}



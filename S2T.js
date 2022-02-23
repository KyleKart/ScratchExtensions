const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');
const log = require('../../util/log');
const DiffMatchPatch = require('diff-match-patch');


/**
 * Url of icon to be displayed at the left edge of each extension block.
 * @type {string}
 */
// eslint-disable-next-line max-len
const iconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkZGRkZGIj48cGF0aCBkPSJNMTIgMTRjMS42NiAwIDIuOTktMS4zNCAyLjk5LTNMMTUgNWMwLTEuNjYtMS4zNC0zLTMtM1M5IDMuMzQgOSA1djZjMCAxLjY2IDEuMzQgMyAzIDN6bTUuMy0zYzAgMy0yLjU0IDUuMS01LjMgNS4xUzYuNyAxNCA2LjcgMTFINWMwIDMuNDEgMi43MiA2LjIzIDYgNi43MlYyMWgydi0zLjI4YzMuMjgtLjQ4IDYtMy4zIDYtNi43MmgtMS43eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4K';


/**
 * Url of icon to be displayed in the toolbox menu for the extension category.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzc1NzU3NSI+CiAgICA8cGF0aCBkPSJNMTIgMTRjMS42NiAwIDIuOTktMS4zNCAyLjk5LTNMMTUgNWMwLTEuNjYtMS4zNC0zLTMtM1M5IDMuMzQgOSA1djZjMCAxLjY2IDEuMzQgMyAzIDN6bTUuMy0zYzAgMy0yLjU0IDUuMS01LjMgNS4xUzYuNyAxNCA2LjcgMTFINWMwIDMuNDEgMi43MiA2LjIzIDYgNi43MlYyMWgydi0zLjI4YzMuMjgtLjQ4IDYtMy4zIDYtNi43MmgtMS43eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';


/**
 * The url of the speech server.
 * @type {string}
 */
const serverURL = 'wss://speech.scratch.mit.edu';

/**
 * The amount of time to wait between when we stop sending speech data to the server and when
 * we expect the transcription result marked with isFinal: true to come back from the server.
 * @type {int}
 */
const finalResponseTimeoutDurationMs = 3000;

/**
 * The max amount of time the Listen And Wait block will listen for.  It may listen for less time
 * if we get back results that are good and think the user is done talking.
 * Currently set to 10sec. This should not exceed the speech api limit (60sec) without redoing how
 * we stream the microphone data data.
 * @type {int}
 */
const listenAndWaitBlockTimeoutMs = 10000;
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const nets = require('nets');
const languageNames = require('scratch-translate-extension-languages');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/png;base64,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';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';

/**
 * The url of the translate server.
 * @type {string}
 */
const serverURL = 'https://translate-service.scratch.mit.edu/';

/**
 * How long to wait in ms before timing out requests to translate server.
 * @type {int}
 */
const serverTimeoutMs = 10000; // 10 seconds (chosen arbitrarily).

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3TranslateBlocks {
    constructor () {
        /**
         * Language code of the viewer, based on their locale.
         * @type {string}
         * @private
         */
        this._viewerLanguageCode = this.getViewerLanguageCode();

        /**
         * List of supported language name and language code pairs, for use in the block menu.
         * Filled in by getInfo so it is updated when the interface language changes.
         * @type {Array.<object.<string, string>>}
         * @private
         */
        this._supportedLanguages = [];

        /**
         * A randomly selected language code, for use as the default value in the language menu.
         * Properly filled in getInfo so it is updated when the interface languages changes.
         * @type {string}
         * @private
         */
        this._randomLanguageCode = 'en';


        /**
         * The result from the most recent translation.
         * @type {string}
         * @private
         */
        this._translateResult = '';

        /**
         * The language of the text most recently translated.
         * @type {string}
         * @private
         */
        this._lastLangTranslated = '';

        /**
         * The text most recently translated.
         * @type {string}
         * @private
         */
        this._lastTextTranslated = '';
    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.translate';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        this._supportedLanguages = this._getSupportedLanguages(this.getViewerLanguageCode());
        this._randomLanguageCode = this._supportedLanguages[
            Math.floor(Math.random() * this._supportedLanguages.length)].value;

        return {
            id: 'translate',
            name: formatMessage({
                id: 'translate.categoryName',
                default: 'Translate',
                description: 'Name of extension that adds translate blocks'
            }),
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            blocks: [
                {
                    opcode: 'getTranslate',
                    text: formatMessage({
                        id: 'translate.translateBlock',
                        default: 'translate [WORDS] to [LANGUAGE]',
                        description: 'translate some text to a different language'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        WORDS: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'translate.defaultTextToTranslate',
                                default: 'hello',
                                description: 'hello: the default text to translate'
                            })
                        },
                        LANGUAGE: {
                            type: ArgumentType.STRING,
                            menu: 'languages',
                            defaultValue: this._randomLanguageCode
                        }
                    }
                },
                {
                    opcode: 'getViewerLanguage',
                    text: formatMessage({
                        id: 'translate.viewerLanguage',
                        default: 'language',
                        description: 'the languge of the project viewer'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {}
                }
            ],
            menus: {
                languages: this._supportedLanguages
            }
        };
    }

    /**
     * Computes a list of language code and name pairs for the given language.
     * @param {string} code The language code to get the list of language pairs
     * @return {Array.<object.<string, string>>} An array of languge name and
     *   language code pairs.
     * @private
     */
    _getSupportedLanguages (code) {
        return languageNames.menuMap[code].map(entry => {
            const obj = {text: entry.name, value: entry.code};
            return obj;
        });
    }
    /**
     * Get the human readable language value for the reporter block.
     * @return {string} the language name of the project viewer.
     */
    getViewerLanguage () {
        this._viewerLanguageCode = this.getViewerLanguageCode();
        const names = languageNames.menuMap[this._viewerLanguageCode];
        const langNameObj = names.find(obj => obj.code === this._viewerLanguageCode);
        let langName = this._viewerLanguageCode;
        if (langNameObj) {
            langName = langNameObj.name;
        }
        return langName;
    }

    /**
     * Get the viewer's language code.
     * @return {string} the language code.
     */
    getViewerLanguageCode () {
        const locale = formatMessage.setup().locale;
        const viewerLanguages = [locale].concat(navigator.languages);
        const languageKeys = Object.keys(languageNames.menuMap);
        // Return the first entry in viewerLanguages that matches
        // one of the available language keys.
        const languageCode = viewerLanguages.reduce((acc, lang) => {
            if (acc) {
                return acc;
            }
            if (languageKeys.indexOf(lang) > -1) {
                return lang;
            }
            return acc;
        }, '') || 'en';
        return languageCode;
    }

    /**
     * Get a language code from a block argument. The arg can be a language code
     * or a language name, written in any language.
     * @param  {object} arg A block argument.
     * @return {string} A language code.
     */
    getLanguageCodeFromArg (arg) {
        const languageArg = Cast.toString(arg).toLowerCase();
        // Check if the arg matches a language code in the menu.
        if (languageNames.menuMap.hasOwnProperty(languageArg)) {
            return languageArg;
        }
        // Check for a dropped-in language name, and convert to a language code.
        if (languageNames.nameMap.hasOwnProperty(languageArg)) {
            return languageNames.nameMap[languageArg];
        }
        // Default to English.
        return 'en';
    }

    /**
     * Translates the text in the translate block to the language specified in the menu.
     * @param {object} args - the block arguments.
     * @return {Promise} - a promise that resolves after the response from the translate server.
     */
    getTranslate (args) {
        // Don't remake the request if we already have the value.
        if (this._lastTextTranslated === args.WORDS &&
            this._lastLangTranslated === args.LANGUAGE) {
            return this._translateResult;
        }

        const lang = this.getLanguageCodeFromArg(args.LANGUAGE);

        let urlBase = `${serverURL}translate?language=`;
        urlBase += lang;
        urlBase += '&text=';
        urlBase += encodeURIComponent(args.WORDS);

        const tempThis = this;
        const translatePromise = new Promise(resolve => {
            nets({
                url: urlBase,
                timeout: serverTimeoutMs
            }, (err, res, body) => {
                if (err) {
                    log.warn(`error fetching translate result! ${res}`);
                    resolve('');
                    return '';
                }
                const translated = JSON.parse(body).result;
                tempThis._translateResult = translated;
                // Cache what we just translated so we don't keep making the
                // same call over and over.
                tempThis._lastTextTranslated = args.WORDS;
                tempThis._lastLangTranslated = args.LANGUAGE;
                resolve(translated);
                return translated;
            });

        });
        translatePromise.then(translatedText => translatedText);
        return translatePromise;
    }
}
module.exports = Scratch3TranslateBlocks;


class Scratch3Speech2TextBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        /**
         * An array of phrases from the [when I hear] hat blocks.
         * The list of phrases in the when I hear hat blocks.  This list is sent
         * to the speech api to seed the recognition engine and for deciding
         * whether the transcription results match.
         * @type {Array}
         * @private
         */
        this._phraseList = [];

        /**
         * The most recent transcription result received from the speech API that we decided to keep.
         * This is the value returned by the reporter block.
         * @type {String}
         * @private
         */
        this._currentUtterance = '';

        /**
         *  Similar to _currentUtterance, but set back to '' at the beginning of listening block
         *  and on green flag.
         *  Used to get the hat blocks to edge trigger.  In order to detect someone saying
         *  the same thing twice in two subsequent listen and wait blocks
         *  and still trigger the hat, we need this to go from
         *  '' at the beginning of the listen block to '<transcription value>' at the end.
         * @type {string}
         * @private
         */
        this._utteranceForEdgeTrigger = null;

        /**
         * The list of queued `resolve` callbacks for 'Listen and Wait' blocks.
         * We only listen to for one utterance at a time.  We may encounter multiple
         * 'Listen and wait' blocks that tell us to start listening. If one starts
         * and hasn't receieved results back yet, when we encounter more, any further ones
         * will all resolve when we get the next acceptable transcription result back.
         * @type {!Array}
         * @private
         */
        this._speechPromises = [];

        /**
         * The id of the timeout that will run if we start listening and don't get any
         * transcription results back. e.g. because we didn't hear anything.
         * @type {number}
         * @private
         */
        this._speechTimeoutId = null;

        /**
         * The id of the timeout that will run to wait for after we're done listening but
         * are still waiting for a potential isFinal:true transcription result to come back.
         * @type {number}
         * @private
         */
        this._speechFinalResponseTimeout = null;

        /**
         * The ScriptProcessorNode hooked up to the audio context.
         * @type {ScriptProcessorNode}
         * @private
         */
        this._scriptNode = null;

        /**
         * The socket used to communicate with the speech server to send microphone data
         * and recieve transcription results.
         * @type {WebSocket}
         * @private
         */
        this._socket = null;

        /**
         * The AudioContext used to manage the microphone.
         * @type {AudioContext}
         * @private
         */
        this._context = null;

        /**
         * MediaStreamAudioSourceNode to handle microphone data.
         * @type {MediaStreamAudioSourceNode}
         * @private
         */
        this._sourceNode = null;

        /**
         * A Promise whose fulfillment handler receives a MediaStream object when the microphone has been obtained.
         * @type {Promise}
         * @private
         */
        this._audioPromise = null;


        /**
         * Diff Match Patch is used to do some fuzzy matching of the transcription results
         * with what is in the hat blocks.
         */
        this._dmp = new DiffMatchPatch();
        // Threshold for diff match patch to use: (0.0 = perfection, 1.0 = very loose).
        this._dmp.Match_Threshold = 0.3;

        this._newSocketCallback = this._newSocketCallback.bind(this);
        this._setupSocketCallback = this._setupSocketCallback.bind(this);
        this._socketMessageCallback = this._socketMessageCallback.bind(this);
        this._processAudioCallback = this._processAudioCallback.bind(this);
        this._onTranscriptionFromServer = this._onTranscriptionFromServer.bind(this);
        this._resetListening = this._resetListening.bind(this);
        this._stopTranscription = this._stopTranscription.bind(this);


        this.runtime.on('PROJECT_STOP_ALL', this._resetListening.bind(this));
        this.runtime.on('PROJECT_START', this._resetEdgeTriggerUtterance.bind(this));

    }

    /**
     * Scans all the 'When I hear' hat blocks for each sprite and pulls out the text.  The list
     * is sent off to the speech recognition server as hints.  This *only* reads the value out of
     * the hat block shadow.  If a block is dropped on top of the shadow, it is skipped.
     * @returns {Array} list of strings from the hat blocks in the project.
     * @private
     */
    _scanBlocksForPhraseList () {
        const words = [];
        // For each each target, walk through the top level blocks and check whether
        // they are speech hat/when I hear blocks.
        this.runtime.targets.forEach(target => {
            target.blocks._scripts.forEach(id => {
                const b = target.blocks.getBlock(id);
                if (b.opcode === 'speech_whenIHearHat') {
                    // Grab the text from the hat block's shadow.
                    const inputId = b.inputs.PHRASE.block;
                    const inputBlock = target.blocks.getBlock(inputId);
                    // Only grab the value from text blocks. This means we'll
                    // miss some. e.g. values in variables or other reporters.
                    if (inputBlock.opcode === 'text') {
                        const word = target.blocks.getBlock(inputId).fields.TEXT.value;
                        words.push(word);
                    }
                }
            });
        });
        return words;
    }

    /**
     * Get the viewer's language code.
     * @return {string} the language code.
     */
    _getViewerLanguageCode () {
        return formatMessage.setup().locale || navigator.language || navigator.userLanguage || 'en-US';
    }

    /**
     * Resets all things related to listening. Called on Red Stop sign button.
     *   - suspends audio processing
     *   - closes socket with speech socket server
     *   - clears out any remaining speech blocks that are waiting.
     * @private.
     */
    _resetListening () {
        this.runtime.emitMicListening(false);
        this._stopListening();
        this._closeWebsocket();
        this._resolveSpeechPromises();
    }

    /**
     * Reset the utterance we look for in the when I hear hat block back to
     * the empty string.
     * @private
     */
    _resetEdgeTriggerUtterance () {
        this._utteranceForEdgeTrigger = '';
    }

    /**
     * Close the connection to the socket server if it is open.
     * @private
     */
    _closeWebsocket () {
        if (this._socket && this._socket.readyState === this._socket.OPEN) {
            this._socket.close();
        }
    }

    /**
     * Call to suspend getting data from the microphone.
     * @private
     */
    _stopListening () {
        // Note that this can be called before any Listen And Wait block did setup,
        // so check that things exist before disconnecting them.
        if (this._context) {
            this._context.suspend.bind(this._context);
        }
        // This is called on green flag to reset things that may never have existed
        // in the first place. Do a bunch of checks.
        if (this._scriptNode) {
            this._scriptNode.removeEventListener('audioprocess', this._processAudioCallback);
            this._scriptNode.disconnect();
        }
        if (this._sourceNode) {
            this._sourceNode.disconnect();
        }
    }

    /**
     * Resolves all the speech promises we've accumulated so far and empties out the list.
     * @private
     */
    _resolveSpeechPromises () {
        for (let i = 0; i < this._speechPromises.length; i++) {
            const resFn = this._speechPromises[i];
            resFn();
        }
        this._speechPromises = [];
    }

    /**
     * Called when we want to stop listening (e.g. when a listen block times out)
     * but we still want to wait a little to see if we get any transcription results
     * back before yielding the block execution.
     * @private
     */
    _stopTranscription () {
        this._stopListening();
        if (this._socket && this._socket.readyState === this._socket.OPEN) {
            this._socket.send('stopTranscription');
        }
        // Give it a couple seconds to response before giving up and assuming nothing else will come back.
        this._speechFinalResponseTimeout = setTimeout(this._resetListening, finalResponseTimeoutDurationMs);
    }

    /**
     * Decides whether to keep a given transcirption result.
     * @param {number} fuzzyMatchIndex Index of the fuzzy match or -1 if there is no match.
     * @param {object} result The json object representing the transcription result.
     * @param {string} normalizedTranscript The transcription text used for matching (i.e. lowercased, no punctuation).
     * @returns {boolean} true If a result is good enough to be kept.
     * @private
     */
    _shouldKeepResult (fuzzyMatchIndex, result, normalizedTranscript) {
        // The threshold above which we decide transcription results are unlikely to change again.
        // See https://cloud.google.com/speech-to-text/docs/basics#streaming_responses.
        const stabilityThreshold = .85;

        // For responsiveness of the When I Hear hat blocks, sometimes we want to keep results that are not
        // yet marked 'isFinal' by the speech api.  Here are some signals we use.

        // If the result from the speech api isn't very stable and we only had a fuzzy match, we don't want to use it.
        const shouldKeepFuzzyMatch = fuzzyMatchIndex !== -1 && result.stability > stabilityThreshold;

        // TODO: This is for debugging. Remove when this function is finalized.
        if (shouldKeepFuzzyMatch) {
            log.info(`Fuzzy match with high stability.`);
            log.info(`match index is  ${fuzzyMatchIndex}`);
            const phrases = this._phraseList.join(' ');
            const matchPhrase = phrases.substring(fuzzyMatchIndex, fuzzyMatchIndex + normalizedTranscript.length);
            log.info(`fuzzy match: ${matchPhrase} in ${normalizedTranscript}`);
        }

        // If the result is in the phraseList (i.e. it matches one of the 'When I Hear' blocks), we keep it.
        // This might be aggressive... but so far seems to be a good thing.
        const shouldKeepPhraseListMatch = this._phraseList.includes(normalizedTranscript);
        // TODO: This is just for debugging. Remove when this function is finalized.
        if (shouldKeepPhraseListMatch) {
            log.info(`phrase list ${this._phraseList} includes ${normalizedTranscript}`);
        }
        // TODO: This is for debugging. Remove when this function is finalized.
        if (result.isFinal) {
            log.info(`result is final`);
        }

        if (!result.isFinal && !shouldKeepPhraseListMatch && !shouldKeepFuzzyMatch) {
            return false;
        }
        return true;
    }

    /**
     * Normalizes text a bit to facilitate matching.  Lowercases, removes some punctuation and whitespace.
     * @param {string} text The text to normalzie
     * @returns {string} The normalized text.
     * @private
     */
    _normalizeText (text) {
        text = Cast.toString(text).toLowerCase();
        text = text.replace(/[.?!]/g, '');
        text = text.trim();
        return text;
    }

    /**
     * Call into diff match patch library to compute whether there is a fuzzy match.
     * @param {string} text The text to search in.
     * @param {string} pattern The pattern to look for in text.
     * @returns {number} The index of the match or -1 if there isn't one.
     */
    _computeFuzzyMatch (text, pattern) {
        // Don't bother matching if any are null.
        if (!pattern || !text) {
            return -1;
        }
        let match = -1;
        try {
            // Look for the text in the pattern starting at position 0.
            match = this._dmp.match_main(text, pattern, 0);
        } catch (e) {
            // This can happen inf the text or pattern gets too long.  If so just substring match.
            return pattern.indexOf(text);
        }
        return match;
    }

    /**
     * Processes the results we get back from the speech server.  Decides whether the results
     * are good enough to keep. If they are, resolves the 'Listen and Wait' blocks promise and cleans up.
     * @param {object} result The transcription result.
     * @private
     */
    _processTranscriptionResult (result) {
        log.info(`Got result: ${JSON.stringify(result)}`);
        const transcriptionResult = this._normalizeText(result.alternatives[0].transcript);

        // Waiting for an exact match is not satisfying.  It makes it hard to catch
        // things like homonyms or things that sound similar "let us" vs "lettuce".  Using the fuzzy matching helps
        // more aggressively match the phrases that are in the "When I hear" hat blocks.
        const phrases = this._phraseList.join(' ');
        const fuzzyMatchIndex = this._computeFuzzyMatch(phrases, transcriptionResult);

        // If the result isn't good enough yet, return without saving and resolving the promises.
        if (!this._shouldKeepResult(fuzzyMatchIndex, result, transcriptionResult)) {
            return;
        }

        this._currentUtterance = transcriptionResult;
        log.info(`Keeing result: ${this._currentUtterance}`);
        this._utteranceForEdgeTrigger = transcriptionResult;

        // We're done listening so resolove all the promises and reset everying so we're ready for next time.
        this._resetListening();

        // We got results so clear out the timeouts.
        if (this._speechTimeoutId) {
            clearTimeout(this._speechTimeoutId);
            this._speechTimeoutId = null;
        }
        if (this._speechFinalResponseTimeout) {
            clearTimeout(this._speechFinalResponseTimeout);
            this._speechFinalResponseTimeout = null;
        }
    }

    /**
     * Handle a message from the socket. It contains transcription results.
     * @param {MessageEvent} e The message event containing data from speech server.
     * @private
     */
    _onTranscriptionFromServer (e) {
        let result = null;
        try {
            result = JSON.parse(e.data);
        } catch (ex) {
            log.error(`Problem parsing json. continuing: ${ex}`);
            // TODO: Question - Should we kill listening and continue?
            return;
        }
        this._processTranscriptionResult(result);
    }


    /**
     * Decide whether the pattern given matches the text. Uses fuzzy matching
     * @param {string} pattern The pattern to look for.  Usually this is the transcription result
     * @param {string} text The text to look in. Usually this is the set of phrases from the when I hear blocks
     * @returns {boolean} true if there is a fuzzy match.
     * @private
     */
    _speechMatches (pattern, text) {
        pattern = this._normalizeText(pattern);
        text = this._normalizeText(text);
        const match = this._computeFuzzyMatch(text, pattern);
        return match !== -1;
    }

    /**
     * Kick off the listening process.
     * @private
     */
    _startListening () {
        this.runtime.emitMicListening(true);
        this._initListening();
        // Force the block to timeout if we don't get any results back/the user didn't say anything.
        this._speechTimeoutId = setTimeout(this._stopTranscription, listenAndWaitBlockTimeoutMs);
    }

    /**
     * Resume listening for audio and re-open the socket to send data.
     * @private
     */
    _resumeListening () {
        this._context.resume.bind(this._context);
        this._newWebsocket();
    }

    /**
     * Does all setup to get microphone data and initializes the web socket.
     * that data to the speech server.
     * @private
     */
    _initListening () {
        this._initializeMicrophone();
        this._initScriptNode();
        this._newWebsocket();
    }

    /**
     * Initialize the audio context and connect the microphone.
     * @private
     */
    _initializeMicrophone () {
        // Don't make a new context if we already made one.
        if (!this._context) {
            // Safari still needs a webkit prefix for audio context
            this._context = new (window.AudioContext || window.webkitAudioContext)();
        }
        // In safari we have to call getUserMedia every time we want to listen. Other browsers allow
        // you to reuse the mediaStream.  See #1202 for more context.
        this._audioPromise = navigator.mediaDevices.getUserMedia({
            audio: true
        });

        this._audioPromise.then().catch(e => {
            log.error(`Problem connecting to microphone:  ${e}`);
        });
    }

    /**
     * Sets up the script processor and the web socket.
     * @private
     *
     */
    _initScriptNode () {
        // Create a node that sends raw bytes across the websocket
        this._scriptNode = this._context.createScriptProcessor(4096, 1, 1);
    }

    /**
     * Callback called when it is time to setup the new web socket.
     * @param {Function} resolve - function to call when the web socket opens succesfully.
     * @param {Function} reject - function to call if opening the web socket fails.
     */
    _newSocketCallback (resolve, reject) {
        this._socket = new WebSocket(serverURL);
        this._socket.addEventListener('open', resolve);
        this._socket.addEventListener('error', reject);
    }

    /**
     * Callback called once we've initially established the web socket is open and working.
     * Sets up the callback for subsequent messages (i.e. transcription results)  and
     * connects to the script node to get data.
     * @private
     */
    _socketMessageCallback () {
        this._socket.addEventListener('message', this._onTranscriptionFromServer);
        this._startByteStream();
    }

    /**
     * Sets up callback for when socket and audio are initialized.
     * @private
     */
    _newWebsocket () {
        const websocketPromise = new Promise(this._newSocketCallback);
        Promise.all([this._audioPromise, websocketPromise]).then(
            this._setupSocketCallback)
            .catch(e => {
                log.error(`Problem with setup:  ${e}`);
            });
    }

    /**
     * Callback to handle initial setting up of a socket.
     * Currently we send a setup message (only contains sample rate) but might
     * be useful to send more data so we can do quota stuff.
     * @param {Array} values The
     */
    _setupSocketCallback (values) {
        this._micStream = values[0];
        this._socket = values[1].target;

        this._socket.addEventListener('error', e => {
            log.error(`Error from web socket: ${e}`);
        });

        // Send the initial configuration message. When the server acknowledges
        // it, start streaming the audio bytes to the server and listening for
        // transcriptions.
        this._socket.addEventListener('message', this._socketMessageCallback, {once: true});
        const langCode = this._getViewerLanguageCode();
        this._socket.send(JSON.stringify(
            {
                sampleRate: this._context.sampleRate,
                phrases: this._phraseList,
                locale: langCode
            }
        ));
    }

    /**
     * Do setup so we can start streaming mic data.
     * @private
     */
    _startByteStream () {
        // Hook up the scriptNode to the mic
        this._sourceNode = this._context.createMediaStreamSource(this._micStream);
        this._sourceNode.connect(this._scriptNode);
        this._scriptNode.addEventListener('audioprocess', this._processAudioCallback);
        this._scriptNode.connect(this._context.destination);
    }

    /**
     * Called when we have data from the microphone. Takes that data and ships
     * it off to the speech server for transcription.
     * @param {audioProcessingEvent} e The event with audio data in it.
     * @private
     */
    _processAudioCallback (e) {
        if (this._socket.readyState === WebSocket.CLOSED ||
        this._socket.readyState === WebSocket.CLOSING) {
            log.error(`Not sending data because not in ready state. State: ${this._socket.readyState}`);
            // TODO: should we stop trying and reset state so it might work next time?
            return;
        }
        const MAX_INT = Math.pow(2, 16 - 1) - 1;
        const floatSamples = e.inputBuffer.getChannelData(0);
        // The samples are floats in range [-1, 1]. Convert to 16-bit signed
        // integer.
        this._socket.send(Int16Array.from(floatSamples.map(n => n * MAX_INT)));
    }

    /**
     * The key to load & store a target's speech-related state.
     * @type {string}
     */
    static get STATE_KEY () {
        return 'Scratch.speech';
    }

    /**
     * @returns {object} Metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'speech2text',
            name: formatMessage({
                id: 'speech.extensionName',
                default: 'Speech to Text',
                description: 'Name of extension that adds speech recognition blocks.'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: iconURI,
            blocks: [
                {
                    opcode: 'listenAndWait',
                    text: formatMessage({
                        id: 'speech.listenAndWait',
                        default: 'listen and wait',
                        // eslint-disable-next-line max-len
                        description: 'Start listening to the microphone and wait for a result from the speech recognition system.'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'whenIHearHat',
                    text: formatMessage({
                        id: 'speech.whenIHear',
                        default: 'when I hear [PHRASE]',
                        // eslint-disable-next-line max-len
                        description: 'Event that triggers when the text entered on the block is recognized by the speech recognition system.'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        PHRASE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'speech.defaultWhenIHearValue',
                                default: 'let\'s go',
                                description: 'The default phrase/word that, when heard, triggers the event.'
                            })
                        }
                    }
                },
                {
                    opcode: 'getSpeech',
                    text: formatMessage({
                        id: 'speech.speechReporter',
                        default: 'speech',
                        description: 'Get the text of spoken words transcribed by the speech recognition system.'
                    }),
                    blockType: BlockType.REPORTER
                }
            ]
        };
    }

    /**
     * Start the listening process if it isn't already in progress.
     * @return {Promise} A promise that will resolve when listening is complete.
     */
    listenAndWait () {
        this._phraseList = this._scanBlocksForPhraseList();
        this._resetEdgeTriggerUtterance();

        const speechPromise = new Promise(resolve => {
            const listeningInProgress = this._speechPromises.length > 0;
            this._speechPromises.push(resolve);
            if (!listeningInProgress) {
                this._startListening();
            }
        });
        return speechPromise;
    }

    /**
     * An edge triggered hat block to listen for a specific phrase.
     * @param {object} args - the block arguments.
     * @return {boolean} true if the phrase matches what was transcribed.
     */
    whenIHearHat (args) {
        return this._speechMatches(args.PHRASE, this._utteranceForEdgeTrigger);
    }

    /**
     * Reporter for the last heard phrase/utterance.
     * @return {string} The lastest thing we heard from a listen and wait block.
     */
    getSpeech () {
        return this._currentUtterance;
    }
}
module.exports = Scratch3Speech2TextBlocks;

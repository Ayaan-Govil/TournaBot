const { NlpManager } = require('node-nlp');
import * as corpus from './corpus-en.json';

const nlp = new NlpManager({ languages: [corpus.locale] });

// Adds the utterances and intents for the NLP
for (const collection of corpus.data) {
    for (const utterance of collection.utterances) {
        nlp.addDocument(corpus.locale, utterance, collection.intent);
    }
    for (const answer of collection.answers) {
        nlp.addAnswer(corpus.locale, collection.intent, answer);
    }
}

nlp.train().then(() => nlp.save()).then(() => console.log('Done training!'));

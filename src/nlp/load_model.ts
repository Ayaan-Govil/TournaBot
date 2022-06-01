const { NlpManager } = require('node-nlp');
import * as corpus from './corpus-en.json';

const nlp = new NlpManager({ languages: [corpus.locale] });
nlp.load();

export = nlp;

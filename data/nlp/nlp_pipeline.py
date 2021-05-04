import spacy
from spacy.language import Language
from spacy.tokens.doc import Doc

from nlp.sentiment_algorithms import sentiment_value

from multiprocessing import Lock

import queue

from nlp.nlp import NLPUnit

pl_queue = queue.Queue()
lock = Lock()

def to_pipeline(nlp_df):
    """
    Sends data to pipeline manager.
    """
    pipeline_manager(nlp_df)

@Language.component("text_clean")
def text_clean_pipe(doc):
    """
    Removes tokens that are tagged as punctuation or stop words.
    @param doc: spacy.tokens.doc.Doc
    @return: cleaned doc
    """
    token_list = [token.text for token in doc if not token.is_punct | token.is_stop]

    return Doc(doc.vocab, words=token_list)

def pre_process(texts):
    """
    Pre-processing stage of pipeline. Uses spaCy to clean and tag text.
    @param texts: list/iter of strings
    @return: list of pre processed texts
    """
    return list(nlp.pipe(texts, batch_size=20))

def determine_sentiment(docs):
    """
    Sentiment stage of pipeline. Calculates sentiment value for each of the docs.
    @param docs: list of docs created by spaCy pre-processing
    """
    sentiment_list = []

    for doc in docs:
        text = ' '.join([token.text for token in doc])
        sentiment_list.append(sentiment_value(text))
    print(len(sentiment_list))

    return sentiment_list

def pipeline_manager(nlp_df):
    """
    Manages all stages of pipeline.
    """
    # pre-processing stage
    nlp_df['doc'] = pre_process(iter(nlp_df['title']))
    
    # sentiment value calculation stage
    nlp_df['sentiment'] = determine_sentiment(nlp_df['doc'])

    print(nlp_df.head(5))

nlp = spacy.load("en_core_web_sm", disable=['tok2vec'])
nlp.add_pipe('text_clean', last=True)
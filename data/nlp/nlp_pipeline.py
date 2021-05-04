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
    return list(nlp.pipe(texts, batch_size=20))

def sentiment_value(docs):
    """
    Returns true if average sentiment by 
    sentence is positive, otherwise returns false
    @params string (news article)
    @return bool
    """
    print("1")
    sia = SentimentIntensityAnalyzer()
    print("2")
    scores = []
    print("3")
    for sentence in nltk.sent_tokenize(txt):
        print("4")
        scores.append(sia.polarity_scores(sentence).get("compound"))
        print("5")
    print("6")
    return mean(scores)

def determine_sentiment(docs):
    sentiment_list = []

    for doc in docs:
        text = ' '.join([token.text for token in doc])
        sentiment_list.append(sentiment_value(text))
    print(len(sentiment_list))

    return sentiment_list

def pipeline_manager(nlp_df):
    nlp_df['doc'] = pre_process(iter(nlp_df['title']))
    
    nlp_df['sentiment'] = determine_sentiment(nlp_df['doc'])

    print(nlp_df.head(5))
    print('goodbye')

    # nlp_unit = NLPUnit(nlp_df)
    # nlp_unit.determine_sentiment()
    # print(nlp_unit.get_df().head(5))

nlp = spacy.load("en_core_web_sm", disable=['tok2vec'])
nlp.add_pipe('text_clean', last=True)
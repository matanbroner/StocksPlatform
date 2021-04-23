from statistics import mean
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize.treebank import TreebankWordDetokenizer
stop_words = stopwords.words('english')

import threading

thread_lock = threading.Lock()

def clean_sentence(txt):
    """
    Normalizes the words of article for better analysis.
    Ex: 'being' -> 'be', 'did' -> 'do'
    Also cleans headlines from stopwords and punctuation.
    @params list of
    @return list of str
    source: digitalocean.com
    """
    thread_lock.acquire()
    article_tokens = [w for w in nltk.word_tokenize(
        txt) if w.isalpha() and w.lower() not in stop_words]
    lemmatizer = WordNetLemmatizer()
    lemmatized_sentence = []
    for word, tag in pos_tag(article_tokens):
        if tag.startswith('NN'):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'
        lemmatized_sentence.append(lemmatizer.lemmatize(word, pos))
    thread_lock.release()
    return TreebankWordDetokenizer().detokenize(lemmatized_sentence)

def sentiment_value(txt):
    """
    Returns true if avarge sentiment by 
    sentence is positve, otherwise retuns fals
    @params string (news article)
    @return bool
    """
    sia = SentimentIntensityAnalyzer()
    scores = []
    for sentence in nltk.sent_tokenize(txt):
        scores.append(sia.polarity_scores(sentence)["compound"])
    return mean(scores)

def headline_sentiment(txt) -> bool:
    return sentiment_value(clean_sentence(txt))

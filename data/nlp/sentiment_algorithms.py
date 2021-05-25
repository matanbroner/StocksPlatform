from statistics import StatisticsError, mean
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize.treebank import TreebankWordDetokenizer
stop_words = stopwords.words('english')

def clean_sentence(txt: str):
    """
    Normalizes the words of article for better analysis.
    Ex: 'being' -> 'be', 'did' -> 'do'
    Also cleans headlines from stopwords and punctuation.
    @params list of
    @return list of str
    source: digitalocean.com
    """
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

    return TreebankWordDetokenizer().detokenize(lemmatized_sentence)

def sentiment_value(txt):
    """
    Calculates the average sentiment from text.
    @param txt: text to process as string (ex: news article)
    @return: mean value of text or None if exception
    """
    scores = []
    try:
        sia = SentimentIntensityAnalyzer()
        for sentence in nltk.sent_tokenize(txt):
            scores.append(sia.polarity_scores(sentence).get("compound"))

        score = mean(scores)
    except StatisticsError:
        return 0
    except Exception as e:
        print('Exception', e)
        return None

    return score

def headline_sentiment(txt: str) -> bool:
    return sentiment_value(clean_sentence(txt))

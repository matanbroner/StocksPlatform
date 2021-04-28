from statistics import mean
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize.treebank import TreebankWordDetokenizer
stop_words = stopwords.words('english')


class SentimentAlgorithms:

    """
    fucntion that normalizes the words of article for better analisys
    for example being is turn to be and did turn to do
    Also cleans headlines from stopwords and punctuation
    @params list of
    @return list of str
    source: digitalocean.com
    """

    def clean_sentence(txt):
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

    def sentiment_value(txt: str):
        """
        Returns mean sentiment score of an specific news headline
         greater than 0.0 -> positive news , less than or equal to 0 -> negative news
        @params string (news article)
        @returns numeric value
        """
        sia = SentimentIntensityAnalyzer()
        scores = []
        for sentence in nltk.sent_tokenize(txt):
            scores.append(sia.polarity_scores(sentence)["compound"])
        return mean(scores)

    def headline_sentiment(txt: str):
        """
        returns mean senimtent value and cleans headline sentence for better results
        @params string (headline)
        @returns bool
        """
        return SentimentAlgorithms.sentiment_value(SentimentAlgorithms.clean_sentence(txt))
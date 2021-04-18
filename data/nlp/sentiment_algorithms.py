from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from textblob import TextBlob
from nltk.tokenize import TabTokenizer
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize.treebank import TreebankWordDetokenizer
stop_words = stopwords.words('english')


from statistics import mean

class SentimentAlgorithms:
    def __init__(self):
        pass



    def most_common_words(txt:str) -> {}:
        """
        Returns a dictionary of the top 3 most common words
        @params str (article)
        @return dict(str,int)
        """
        words: list[str] = nltk.word_tokenize(txt)
        fd = nltk.FreqDist(w.lower() for w in words)
        return fd.most_common(3)

    def most_common_trigrams(txt:str)->[]:
        """
        Return the most common trigrams, which are frequent three-word combinations
        @params: str
        @return list of dictionaries
        """
        words = [w for w in nltk.word_tokenize(txt) if w.isalpha()]
        finder = nltk.collocations.TrigramCollocationFinder.from_words(words)
        return finder.ngram_fd.most_common(2)
    


    """
    fucntion that normalizes the words of article for better analisys
    for example being is turn to be and did turn to do
    Also cleans headlines from stopwords and punctuation
    @params list of
    @return list of str
    source: digitalocean.com
    """
    def clean_sentence(txt):
        article_tokens = [w for w in nltk.word_tokenize(txt) if w.isalpha() and w.lower() not in stop_words]
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

    def sentiment_value(txt: str) -> bool:
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
        return mean(scores) > 0

    def headline_sentiment(txt:str) ->bool:
        return SentimentAlgorithms.sentiment_value(SentimentAlgorithms.clean_sentence(txt))




"""
Testing made here in Main
"""

if __name__ == "__main__":

    negativenews_test = "Amazon is considering firing about one thenth of its employes."
    
    positivenews_test = "As new Americans become more wealthy\n the stock is thriving with new investment"

    most_common = " The american flag is the best in all america.\n When america won againts the british america never gave up on its country"

    print(SentimentAlgorithms.headline_sentiment(negativenews_test))
    print(SentimentAlgorithms.headline_sentiment(positivenews_test))

  

from sentiment_algorithms import SentimentAlgorithms

negative_news_test = 'Amazon is considering firing about one thenth of its employes.\n With the impact of Covid-19 Amazon has taken extreme measuers to keep up with the pandemic'
positive_news_test = 'As millions of Americans reive their releif package,\n an increase in stock investemnt has been observed over the last few months'


class TestSentimentAlgorithms():

    def test_is_positive():
        print('If output is True, test has passed for postive news headline:\n')
        print(SentimentAlgorithms.headline_sentiment(positive_news_test))

    def test_is_negative():
        print('If output is False, test has passed for negative news headline:\n')
        print(SentimentAlgorithms.headline_sentiment(negative_news_test))
        


if __name__ == "__main__":
    TestSentimentAlgorithms.test_is_positive()
    TestSentimentAlgorithms.test_is_negative()

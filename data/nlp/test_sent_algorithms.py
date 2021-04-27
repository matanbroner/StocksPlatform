
from sentiment_algorithms import SentimentAlgorithms

negative_news_test = 'Amazon is considering firing about one tenth of its employes.\n With the impact of Covid-19 Amazon has taken extreme measures to keep up with the pandemic'
positive_news_test = 'As millions of Americans recieve their releif package,\n an increase in stock investement has been observed over the last few months'


class TestSentimentAlgorithms():

    def test_is_positive():
        print('If output greater than 0.0, test has passed for postive news headline:\n')
        print(SentimentAlgorithms.headline_sentiment(positive_news_test))

    def test_is_negative():
        print('If output 0.0 or less, test has passed for negative news headline:\n')
        print(SentimentAlgorithms.headline_sentiment(negative_news_test))


if __name__ == "__main__":
    TestSentimentAlgorithms.test_is_positive()
    TestSentimentAlgorithms.test_is_negative()


import urllib.parse
import http.client
import json
from nlp.sentiment_algorithms import SentimentAlgorithms
import unittest

negative_news_test = 'Amazon is considering firing about one tenth of its employes.\n With the impact of Covid-19 Amazon has taken extreme measures to keep up with the pandemic'
positive_news_test = 'As millions of Americans recieve their releif package,\n an increase in stock investement has been observed over the last few months'


conn = http.client.HTTPConnection('api.mediastack.com')

params = urllib.parse.urlencode({
    'access_key': 'f8962e7fe5ef3f37341a5500454afeec',
    'keywords': 'finance',
    'categories': 'business',
    'sort': 'published_desc',
    'limit': 100,
})

conn.request('GET', '/v1/news?{}'.format(params))

res = conn.getresponse()
data = json.loads(res.read().decode('utf-8'))


class TestSentimentAlgorithms(unittest.TestCase):

    def test_positive_headline(self):
        value = SentimentAlgorithms.headline_sentiment(positive_news_test)
        self.assertGreater(value, 0.0)

    def test_negative_headline(self):
        value = SentimentAlgorithms.headline_sentiment(negative_news_test)
        self.assertLessEqual(value, 0.0)

    def test_various_headlines(self):
        for news in data['data']:
            value = SentimentAlgorithms.headline_sentiment(news['title'])
            self.assertIsNotNone(value)


if __name__ == '__main__':
    unittest.main()

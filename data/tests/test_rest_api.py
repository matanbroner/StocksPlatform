import unittest
import json

from pprint import pprint

import api.v1.nlp_api as nlp_api
from db.sqlalchemy_db import init_db_connection

from flask import Flask


class NlpRestApiTest(unittest.TestCase):
    def setUp(self):
        self.stock = 'AMZN'
        self.source = 'Benzinga'
        self.time_frame = 1

    def test_get_news_articles_by_ticker(self):
        print('---------- TEST 1 ----------')
        response = nlp_api.get_news_articles_by_ticker(self.stock)

        print('Number of news articles for %s:' % (self.stock), len(response.json['data']))

        self.assertEqual(200, response.status_code)

    def test_get_news_articles_by_ticker_in_time_frame(self):
        print('---------- TEST 2 ----------')
        response_1 = nlp_api.get_news_articles_by_ticker(self.stock)
        response_2 = nlp_api.get_news_articles_by_ticker_in_time_frame(self.stock, self.time_frame)

        print('Number of news articles for %s over the last %d days:' % (self.stock, self.time_frame), len(response_2.json['data']))

        self.assertEqual(200, response_2.status_code)
        self.assertGreaterEqual(len(response_1.json['data']), len(response_2.json['data']))

    def test_get_news_articles_by_source(self):
        print('---------- TEST 3 ----------')
        response = nlp_api.get_news_articles_by_source(self.source)

        print('Number of news articles for %s:' % (self.source), len(response.json['data']))

        self.assertEqual(200, response.status_code)

    def test_get_news_articles_by_source_in_time_frame(self):
        print('---------- TEST 4 ----------')
        response_1 = nlp_api.get_news_articles_by_source(self.source)
        response_2 = nlp_api.get_news_articles_by_source_in_time_frame(self.source, self.time_frame)

        print('Number of news articles for %s over the last %d days:' % (self.source, self.time_frame), len(response_2.json['data']))

        self.assertEqual(200, response_2.status_code)
        self.assertGreaterEqual(len(response_1.json['data']), len(response_2.json['data']))

    def test_get_stock_sentiment(self):
        print('---------- TEST 5 ----------')
        response = nlp_api.get_stock_sentiment(self.stock)

        print('Sentiment for %s:' % (self.stock), response.json['data'])

        self.assertEqual(200, response.status_code)

    def test_get_stock_sentiment_in_time_frame(self):
        print('---------- TEST 6 ----------')
        response_1 = nlp_api.get_stock_sentiment(self.stock)
        response_2 = nlp_api.get_stock_sentiment_in_time_frame(self.stock, self.time_frame)

        print('Sentiment for %s over the last %d days:' % (self.stock, self.time_frame), response_2.json['data'])

        self.assertEqual(200, response_2.status_code)
        self.assertNotEqual(response_1.json['data'], response_2.json['data'])

if __name__ == "__main__":
    app = Flask(__name__)

    with app.app_context():
        init_db_connection()
        unittest.main()

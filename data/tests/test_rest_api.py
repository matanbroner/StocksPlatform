import unittest
import json

from pprint import pprint

import api.v1.nlp as nlp_api
from db.sqlalchemy_db import init_db_connection

import requests

from flask import Flask


class NlpRestApiTest(unittest.TestCase):
    def setUp(self):
        init_db_connection()
        self.stock = 'AAPL'
        self.source = 'Benzinga'
        self.time_frame = 30

    def test_get_news_articles_by_ticker(self):
        response = requests.get('http://localhost:5000/news/article?ticker=' + self.stock)
        self.assertEqual(200, response.status_code)

        #print('Number of news articles for %s:' % (self.stock), len(response.json()['data']))

    def test_get_news_articles_by_source(self):
        response = requests.get(
            'http://localhost:5000/news/article?source=' + self.source)
        self.assertEqual(200, response.status_code)

        #print('Number of news articles for %s:' % (self.source), len(response.json()['data']))

    def test_get_stock_sentiment(self):
        response = requests.get(
            'http://localhost:5000/news/sentiment/' + self.stock)
        self.assertEqual(response.status_code, 200)

        #print('Sentiment for %s:' % (self.stock), response.json()['data'])

    def test_get_news_articles_by_ticker_in_time_frame(self):
        response_1 = requests.get('http://localhost:5000/news/article?ticker=' + self.stock)
        response_2 = requests.get('http://localhost:5000/news/article?ticker=' + self.stock, '&time_frame=' + str(self.time_frame))

        self.assertEqual(200, response_1.status_code)
        self.assertEqual(200, response_2.status_code)

        #print('Number of news articles for %s over the last %d days:' % (self.stock, self.time_frame), len(response_2.json()['data']))

        # need historical data to test
        #self.assertGreaterEqual(len(response_1.json()['data']), len(response_2.json()['data']))

    def test_get_news_articles_by_source_in_time_frame(self):
        response_1 = requests.get('http://localhost:5000/news/article?source=' + self.source)
        response_2 = requests.get('http://localhost:5000/news/article?source=' + self.source + '&time_frame=' + str(self.time_frame))

        self.assertEqual(200, response_1.status_code)
        self.assertEqual(200, response_2.status_code)

        #print('Number of news articles for %s over the last %d days:' % (self.source, self.time_frame), len(response_2.json()['data']))

        # need historical data to test
        #self.assertGreaterEqual(len(response_1.json()['data']), len(response_2.json()['data']))

    def test_get_stock_sentiment_in_time_frame(self):
        response_1 = requests.get('http://localhost:5000/news/sentiment/' + self.stock)
        response_2 = requests.get('http://localhost:5000/news/sentiment/' + self.stock + '?time_frame=' + str(self.time_frame))

        self.assertEqual(response_1.status_code, 200)
        self.assertEqual(response_2.status_code, 200)

        #print('Sentiment for %s over the last %d days:' % (self.stock, self.time_frame), response_2.json()['data'])

        self.assertEqual(200, response_2.status_code)
        
        # need historical data to test
        #self.assertNotEqual(response_1.json()['data'], response_2.json()['data'])

if __name__ == "__main__":
    app = Flask(__name__)

    with app.app_context():
        unittest.main()

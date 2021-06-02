import unittest
import json

import datetime

import api.v1.nlp as nlp_api
from db.sqlalchemy_db import init_db_connection

from db.handlers.stock_handler import (
    create_stock,
    get_stock_by_ticker,
    delete_stock_by_id
)

from db.handlers.news_source_handler import (
    create_news_source,
    get_news_source_by_name,
    delete_news_source_by_id
)

from db.handlers.news_articles_handler import (
    create_news_article,
    get_news_article_by_id,
    get_news_article_by_ticker_and_source_and_headline,
    delete_news_article_by_id
)

import requests

from flask import Flask


class NlpRestApiTest(unittest.TestCase):
    def setUp(self):
        init_db_connection()
        try:
            self.stock = create_stock('TEST_STOCK')
        except Exception:
            # previous test interrupted early so it wasn't deleted from database
            self.stock = get_stock_by_ticker('TEST_STOCK')

        try:
            self.source = create_news_source('TEST_SOURCE')
        except Exception:
            # previous test interrupted early so it wasn't deleted from database
            self.source = get_news_source_by_name('TEST_SOURCE')
            
        self.time_frame = 15

        try:
            self.article = create_news_article(
                self.source['id'],
                self.stock['id'],
                .7,
                'TEST_HEADLINE',
                'www.url.com/qwefqwbk',
                datetime.datetime.now())
        except:
            # previous test interrupted early so it wasn't deleted from database
            self.article = get_news_article_by_ticker_and_source_and_headline(
                self.stock['ticker'],
                self.source['source_name'],
                'TEST_HEADLINE'
            )

        try:
            self.historic_article = create_news_article(
                self.source['id'],
                self.stock['id'],
                .3,
                'TEST_HISTORIC_HEADLINE',
                'www.url.com/asqwerkfjaes',
                datetime.datetime.now() - datetime.timedelta(30))
        except:
            # previous test interrupted early so it wasn't deleted from database
            self.article = get_news_article_by_ticker_and_source_and_headline(
                self.stock['ticker'],
                self.source['source_name'],
                'TEST_HISTORIC_HEADLINE'
            )

    def tearDown(self):
        delete_news_article_by_id(self.article['id'])
        delete_news_article_by_id(self.historic_article['id'])
        delete_stock_by_id(self.stock['id'])
        delete_news_source_by_id(self.source['id'])

    def test_get_news_articles_by_ticker(self):
        response = requests.get('http://localhost:5000/news/article?ticker=' + self.stock['ticker'])
        self.assertEqual(200, response.status_code)

        #print('Number of news articles for %s:' % (self.stock), len(response.json()['data']))

    def test_get_news_articles_by_source(self):
        response = requests.get(
            'http://localhost:5000/news/article?source=' + self.source['source_name'])
        self.assertEqual(200, response.status_code)

        #print('Number of news articles for %s:' % (self.source), len(response.json()['data']))

    def test_get_stock_sentiment(self):
        response = requests.get(
            'http://localhost:5000/news/sentiment/' + self.stock['ticker'])
        self.assertEqual(response.status_code, 200)

        #print('Sentiment for %s:' % (self.stock), response.json()['data'])

    def test_get_news_articles_by_ticker_in_time_frame(self):
        response_1 = requests.get('http://localhost:5000/news/article?ticker=' + self.stock['ticker'])
        response_2 = requests.get('http://localhost:5000/news/article?ticker=' + self.stock['ticker'], '&time_frame=' + str(self.time_frame))

        self.assertEqual(200, response_1.status_code)
        self.assertEqual(200, response_2.status_code)

        #print('Number of news articles for %s over the last %d days:' % (self.stock, self.time_frame), len(response_2.json()['data']))

        self.assertGreaterEqual(len(response_1.json()['data']), len(response_2.json()['data']))

    def test_get_news_articles_by_source_in_time_frame(self):
        response_1 = requests.get('http://localhost:5000/news/article?source=' + self.source['source_name'])
        response_2 = requests.get('http://localhost:5000/news/article?source=' + self.source['source_name'] + '&time_frame=' + str(self.time_frame))

        self.assertEqual(200, response_1.status_code)
        self.assertEqual(200, response_2.status_code)

        #print('Number of news articles for %s over the last %d days:' % (self.source, self.time_frame), len(response_2.json()['data']))

        self.assertGreaterEqual(len(response_1.json()['data']), len(response_2.json()['data']))

    def test_get_stock_sentiment_in_time_frame(self):
        response_1 = requests.get('http://localhost:5000/news/sentiment/' + self.stock['ticker'])
        response_2 = requests.get('http://localhost:5000/news/sentiment/' + self.stock['ticker'] + '?time_frame=' + str(self.time_frame))

        self.assertEqual(response_1.status_code, 200)
        self.assertEqual(response_2.status_code, 200)

        #print('Sentiment for %s over the last %d days:' % (self.stock, self.time_frame), response_2.json()['data'])

        self.assertEqual(200, response_2.status_code)
        
        self.assertNotEqual(response_1.json()['data'], response_2.json()['data'])

if __name__ == "__main__":
    app = Flask(__name__)

    with app.app_context():
        unittest.main()

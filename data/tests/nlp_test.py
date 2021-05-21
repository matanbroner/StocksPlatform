import unittest

import datetime
import pandas as pd

from nlp.retrieve_news import main
import nlp.news_sources as news

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

from nlp.nlp_pipeline import (
    filter_news,
    pre_process,
    determine_sentiment,
    save_data
)

# # TODO: remove hardcoded API key and use env variable
API_KEY = '0cc8ff319abbabcab8e06288e3c67c3c'

class TestNewsSources(unittest.TestCase):
    def setUp(self):
        self.general_news = news.GeneralNewsData(API_KEY, 'AAPL')
        #self.reddit_news = news.RedditData(client_id, client_secret, subreddit)

    def test_get_stock(self):
        self.assertEqual(self.general_news.get_stock(), 'AAPL')

    def test_nonexistent_stock(self):
        news_src = news.GeneralNewsData(API_KEY, 'XXXX')
        self.assertEqual(news_src.retrieve_data(), None)

    def test_retrieve_data(self):
        self.assertEqual(list(self.general_news.retrieve_data().columns), ['stock', 'source', 'date', 'title', 'url', 'content'])

class TestNLPPipeline(unittest.TestCase):
    def setUp(self):
        self.test_df = pd.DataFrame(
            [['TEST_STOCK', 'TEST_SOURCE', datetime.datetime(1972, 5, 17), 'This is a test headline.', 'WWW.TEST_URL.COM', 'This is test content. Usually there is a lot more text.', 1.0]],
            columns=['stock', 'source', 'date', 'title', 'url', 'content', 'sentiment'])

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

    def tearDown(self):
        delete_stock_by_id(self.stock['id'])
        delete_news_source_by_id(self.source['id'])

    def test_filter_news(self):
        article = create_news_article(
            self.source['id'],
            self.stock['id'],
            self.test_df['sentiment'][0],
            self.test_df['title'][0],
            self.test_df['url'][0],
            datetime.datetime(1972, 5, 17))

        filtered_df = filter_news(self.test_df)
        self.assertTrue(filtered_df.empty)

        delete_news_article_by_id(article['id'])

    def test_filter_news_same_article_different_stock(self):
        article = create_news_article(
            self.source['id'],
            self.stock['id'],
            self.test_df['sentiment'][0],
            self.test_df['title'][0],
            self.test_df['url'][0],
            datetime.datetime(1972, 5, 17))

        self.test_df['stock'] = 'DIFFERENT_TEST_STOCK'

        filtered_df = filter_news(self.test_df)
        self.assertFalse(filtered_df.empty)

        delete_news_article_by_id(article['id'])

    def test_pre_process(self):
        docs = pre_process(iter(self.test_df['title']))
        text_list = []
        for doc in docs:
            text_list.append(' '.join([token.text for token in doc]))

        self.assertGreaterEqual(len(self.test_df['title'][0]), len(text_list[0]))

    def test_pre_process_empty_headline(self):
        docs = pre_process([''])
        text_list = []
        for doc in docs:
            text_list.append(' '.join([token.text for token in doc]))

        self.assertGreaterEqual(len(self.test_df['title'][0]), len(text_list[0]))

    def test_determine_sentiment(self):
        headlines = ['This should be positive', 
        'This should be neutral.', 
        'This should be negative.']
        docs = pre_process(headlines)
        sentiment_list = determine_sentiment(docs)

        self.assertGreater(sentiment_list[0], 0)
        self.assertEqual(sentiment_list[1], 0)
        self.assertLess(sentiment_list[2], 0)

    def test_determine_sentiment_empty_headline(self):
        headlines = ['']
        docs = pre_process(headlines)
        sentiment_list = determine_sentiment(docs)
        self.assertEqual(sentiment_list[0], 0)

    def test_save_data(self):
        article_ids = save_data(self.test_df)
        
        self.assertEqual(len(article_ids), 1)
        self.assertIsNotNone(get_news_article_by_id(article_ids[0]))

        delete_news_article_by_id(article_ids[0])

    def test_save_data_no_url(self):
        self.test_df['url'] = None
        articles = save_data(self.test_df)

        self.assertEqual(len(articles), 0)
        self.assertIsNone(get_news_article_by_ticker_and_source_and_headline(
            self.test_df['stock'][0], self.test_df['source'][0], self.test_df['title'][0]))

    def test_save_data_no_headline(self):
        self.test_df['title'] = None
        articles = save_data(self.test_df)

        self.assertEqual(len(articles), 0)

    def test_full_pipeline(self, stock_list=['AAPL', 'TSLA', 'GME', 'AMZN', 'BB', 'DIS', 'MSFT', 'TWTR', 'SNAP', 'NFLX', 'SBUX']):
        self.assertEqual(main(API_KEY, stock_list), 1)

    def test_pipeline_no_crash_on_bad_src(self, stock_list=['XXXX']):
        self.assertEqual(main(API_KEY, stock_list), 1)

    # def test_pipeline_stress(self):
    #     """
    #     Outdated test. Pipeline does not process repeat articles anymore, so this form of test is no longer effective.
    #     """
    #     stock_list = []
    #     for i in range(1000):
    #         stock_list.append('AAPL')
    #     self.assertEqual(main(API_KEY, stock_list), 1)


if __name__ == '__main__':
    init_db_connection()
    unittest.main()

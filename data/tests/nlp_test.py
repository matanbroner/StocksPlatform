import unittest
from nlp.retrieve_news import main
import nlp.news_sources as news

from db.sqlalchemy_db import init_db_connection

# # TODO: remove hardcoded API key and use env variable
API_KEY = "21f629c6a2f7fd6d165fdc9a187259a9"

# class TestNewsSources(unittest.TestCase):
#     def setUp(self):
#         self.general_news = news.GeneralNewsData(API_KEY, 'AAPL')
#         #self.reddit_news = news.RedditData(client_id, client_secret, subreddit)

#     def test_get_stock(self):
#         self.assertEqual(self.general_news.get_stock(), 'AAPL')

#     def test_nonexistent_stock(self):
#         news_src = news.GeneralNewsData(API_KEY, 'XXXX')
#         self.assertEqual(news_src.retrieve_data(), None)

#     def test_retrieve_data(self):
#         self.assertEqual(list(self.general_news.retrieve_data().columns), ['stock', 'source', 'date', 'title', 'content'])

class TestNLPPipeline(unittest.TestCase):
    def test_nlp_pipeline(self, stock_list=['AAPL', 'TSLA', 'GME', 'AMZN', 'BB', 'DIS', 'MSFT', 'TWTR', 'SNAP', 'NFLX', 'SBUX']):
        self.assertEqual(main(API_KEY, stock_list), 1)

    # def test_pipeline_stress(self):
    #     stock_list = []
    #     for i in range(1000):
    #         stock_list.append('AAPL')
    #     self.assertEqual(main(API_KEY, stock_list), 1)

    # def test_pipeline_no_crash_on_bad_src(self, stock_list=['XXXX']):
    #     self.assertEqual(main(API_KEY, stock_list), 1)

if __name__ == '__main__':
    init_db_connection()
    unittest.main()

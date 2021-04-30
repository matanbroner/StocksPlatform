import unittest
from nlp.retrieve_news import main
import nlp.news_sources as news
import nlp.nlp as nlp

# # TODO: remove hardcoded API key and use env variable
API_KEY = "21f629c6a2f7fd6d165fdc9a187259a9"


class TestNewsRetrieval(unittest.TestCase):
    def test_news_retrieval(self, stock_list=['AAPL', 'GME', 'TSLA']):
        self.assertEqual(main(API_KEY, stock_list), 1)

class TestNewsSources(unittest.TestCase):
    def setUp(self):
        self.general_news = news.GeneralNewsData(API_KEY, 'AAPL')
        #self.reddit_news = news.RedditData(client_id, client_secret, subreddit)

    def test_get_stock(self):
        self.assertEqual(self.general_news.get_stock(), 'AAPL')

    def test_retrieve_data(self):
        self.assertEqual(list(self.general_news.retrieve_data().columns), ['stock', 'source', 'date', 'title', 'content'])
       
class TestNLP(unittest.TestCase):
    def setUp(self):
        self.general_news = news.GeneralNewsData(API_KEY, 'AAPL')
        self.nlp = nlp.NLPUnit('AAPL', self.general_news.retrieve_data())

class TestNLPPipeline(unittest.TestCase):
    def test_nlp_pipeline(self, stock_list=['AAPL', 'TSLA', 'GME', 'AMZN', 'BB', 'DIS', 'MSFT', 'TWTR', 'SNAP', 'NFLX', 'SBUX']):
        self.assertEqual(main(API_KEY, stock_list), 1)

    # def test_pipeline_stress(self):
    #     stock_list = []
    #     for i in range(1000):
    #         stock_list.append('AAPL')
    #     self.assertEqual(main(API_KEY, stock_list), 1)

def run_tests():
    #test_classes = [TestNewsRetrieval, TestNewsSources, TestNLP]
    test_classes = [TestNLPPipeline]

    loader = unittest.TestLoader()

    suites_list = []
    for test_class in test_classes:
        suite = loader.loadTestsFromTestCase(test_class)
        suites_list.append(suite)

    big_suite = unittest.TestSuite(suites_list)

    runner = unittest.TextTestRunner()
    results = runner.run(big_suite)

if __name__ == '__main__':
    run_tests()

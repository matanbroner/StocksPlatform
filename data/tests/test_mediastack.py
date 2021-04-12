import unittest
from api.mediastack import MediaStackApi

# TODO: remove hardcoded API key and use env variable
# API key is on free tier at the moment, must use HTTP
API_KEY = "9980807ba90f99c26d20e89c8cdcdc09"


class TestMediaStackApi(unittest.TestCase):

    def setUp(self):
        self.api = MediaStackApi(api_key=API_KEY, use_https=False)

    def test_get_live_news(self):
        tsla_news = self.api.get_news(keywords="Tesla")
        self.assertIsInstance(tsla_news, dict)
        self.assertIn("pagination", tsla_news)
        self.assertIn("data", tsla_news)


if __name__ == '__main__':
    unittest.main()

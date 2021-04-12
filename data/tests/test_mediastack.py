import unittest
from api.mediastack import MediaStackApi

# TODO: remove hardcoded API key and use env variable
API_KEY = "9980807ba90f99c26d20e89c8cdcdc09"


class TestMediaStackApi(unittest.TestCase):

    def setUp(self):
        self.api = MediaStackApi(api_key=API_KEY)

    def test_get_live_news(self):
        tsla_news = self.api.get_news(keywords="Tesla")
        self.assertIsInstance(tsla_news, dict)
        self.assertIn(tsla_news, "pagination")
        self.assertIn(tsla_news, "data")


if __name__ == '__main__':
    unittest.main()

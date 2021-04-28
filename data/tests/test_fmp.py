import unittest
from api.fmp import FinancialModelingPrepApi

# TODO: remove hardcoded API key and use env variable
API_KEY = "e2d9d13e5b7ac7976216133f32d7f775"


class TestFinancialModelingPrepApi(unittest.TestCase):

    def setUp(self):
        self.api = FinancialModelingPrepApi(api_key=API_KEY)

    def test_company_profile(self):
        search_aapl = self.api.company_profile(ticker="AAPL")
        self.assertIsInstance(search_aapl, list)
        self.assertIsInstance(search_aapl[0], object)
        self.assertTrue(search_aapl[0]["symbol"] == "AAPL")

    def test_get_statement_by_type(self):
        # test income statements fetching with dynamic statement type
        search_aapl_income_qtr = self.api.get_statement_by_type(ticker="AAPL", statement_type="income",
                                                                period="quarter")
        self.assertIsInstance(search_aapl_income_qtr, list)
        self.assertIsInstance(search_aapl_income_qtr[0], object)
        self.assertTrue(search_aapl_income_qtr[0]["symbol"] == "AAPL")
        self.assertTrue(len(search_aapl_income_qtr) >= 2)

        # get first two quarters, verify time range is indeed a quarter
        # take date (ex. "2020-12-26"), split by "-", and take month index (ex. "12")
        qtr_1 = (search_aapl_income_qtr[0]["date"]).split("-")[1]
        qtr_2 = (search_aapl_income_qtr[1]["date"]).split("-")[1]
        # check is three month difference
        assert (int(qtr_1) - int(qtr_2) == 3)

    def test_get_all_statements(self):
        search_appl = self.api.get_all_statements(ticker="APPL")
        self.assertIsInstance(search_appl, object)
        self.assertEquals(len(search_appl.keys()), 3)
        for key in ["income", "cash-flow", "balance-sheet"]:
            self.assertIn(key, search_appl)

    def test_get_ratios(self):
        # test periodic first
        search_appl_qtr = self.api.get_ratios(ticker="AAPL", period="quarter")
        self.assertIsInstance(search_appl_qtr, list)
        self.assertTrue(len(search_appl_qtr) > 1)
        self.assertIsInstance(search_appl_qtr[0], object)

        # test ttm, should only return one item in the list
        search_appl_ttm = self.api.get_ratios(ticker="AAPL", ttm=True)
        self.assertIsInstance(search_appl_ttm, list)
        self.assertTrue(len(search_appl_ttm) == 1)
        self.assertIsInstance(search_appl_ttm[0], object)

    def test_get_enterprise_value(self):
        search_appl = self.api.get_enterprise_value(ticker="AAPL", period="quarter")
        self.assertIsInstance(search_appl, list)
        self.assertIsInstance(search_appl[0], object)
        self.assertTrue(search_appl[0]["symbol"] == "AAPL")

    def test_get_company_growth(self):
        search_appl = self.api.get_company_growth(ticker="AAPL", period="quarter")
        self.assertIsInstance(search_appl, list)
        self.assertIsInstance(search_appl[0], object)
        self.assertTrue(search_appl[0]["symbol"] == "AAPL")

    def test_get_rating(self):
        # test immediate rating
        search_appl = self.api.get_rating(ticker="AAPL")
        self.assertIsInstance(search_appl, list)
        self.assertTrue(len(search_appl) == 1)
        self.assertIsInstance(search_appl[0], object)
        self.assertTrue(search_appl[0]["symbol"] == "AAPL")
        self.assertIn("ratingRecommendation", search_appl[0])

        # test historical
        search_appl = self.api.get_rating(ticker="AAPL", historical=True)
        self.assertIsInstance(search_appl, list)
        self.assertTrue(len(search_appl) > 1)
        self.assertIsInstance(search_appl[0], object)


if __name__ == '__main__':
    unittest.main()

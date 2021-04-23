import argparse
from nlp.sentiment_data import main

parser = argparse.ArgumentParser(description='NLP Test File')
parser.add_argument('-k', metavar='key', help='FMP API Key',
                    type=str, required=True)
parser.add_argument('-s', metavar='stock_ticker', help='Stock ticker list',
                    type=list, nargs='+', default=['AAPL', 'GME', 'TSLA'])
args = parser.parse_args()

stock_list = list(map(''.join, args.s))

main(args.k, stock_list)

# # TODO: remove hardcoded API key and use env variable
# API_KEY = "e2d9d13e5b7ac7976216133f32d7f775"

# class TestNaturalLanguageProcessing:
#     def test_retrieve_stock_data(self, stock_list=['AAPL', 'GME', 'TSLA']):
#         assert(main(API_KEY, stock_list) == 1)

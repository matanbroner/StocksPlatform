import argparse
from nlp.sentiment_data import main

parser = argparse.ArgumentParser(description="NLP Test File")
parser.add_argument('-k', help='API key for FinancialModelingPrep',
                    type=str)
args = parser.parse_args()

main(args.k)
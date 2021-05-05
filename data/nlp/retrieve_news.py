import concurrent.futures
import time

import pandas as pd

from nlp.news_sources import GeneralNewsData, RedditData
from nlp.nlp_pipeline import to_pipeline

def retrieve_news_data(src):
    """
    Called when subprocess is started.
    Retrieves news data using the supplied source and sends data to NLP pipeline.
    @param src: source object
    @return: None
    """
    success = False
    attempts = 0
    while not success and attempts < 3:
        try:
            response_df = src.retrieve_data()
            success = True
            #print("Successful grabbed news data for %s." % (src.get_stock()))
        except RuntimeError:
            attempts += 1
            continue

    if not success:
        print("Failed to grab news data for %s." % (src.get_stock()))
    elif response_df is not None:
        # send to data processing pipeline
        to_pipeline(response_df)

def main(fmp_key, stock_list):
    """
    Creates a source list and sets up subprocesses for retrieving news data.
    """
    sources = []
    for stock in stock_list:
        sources.append(GeneralNewsData(fmp_key, stock))

    with concurrent.futures.ProcessPoolExecutor() as executor:
        executor.map(retrieve_news_data, sources)

    #print("Exiting Main Thread")
    return 1

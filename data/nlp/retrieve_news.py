import concurrent.futures
from logging import error
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
        return response_df

def main(fmp_key, stock_list):
    """
    Creates a source list and sets up subprocesses for retrieving news data.
    """
    sources = []
    for stock in stock_list:
        sources.append(GeneralNewsData(fmp_key, stock))

    with concurrent.futures.ProcessPoolExecutor() as executor:
        future_to_stock = {executor.submit(retrieve_news_data, source):source.get_stock() for source in sources}

        for future in concurrent.futures.as_completed(future_to_stock):
            stock = future_to_stock[future]
            try:
                data = future.result()
            except Exception as e:
                print('%s news retrieval generated an exception: %s' % (stock, e))
            else:
                if data is not None:
                    print("Sending", stock, "to pipeline.")
                    to_pipeline(data)
    #print("Exiting Main Thread")
    return 1

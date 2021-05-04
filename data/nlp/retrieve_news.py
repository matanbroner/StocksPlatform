# multithreading support
import threading
import concurrent.futures
import time

import pandas as pd

from nlp.news_sources import GeneralNewsData, RedditData
from nlp.nlp import NLPUnit
from nlp.nlp_pipeline import pl_queue, to_pipeline

thread_lock = threading.Lock()

def retrieve_news_data(src):
    """
    Called when thread is started.
    """
    success = False
    attempts = 0
    while not success and attempts < 3:
        try:
            response_df = src.retrieve_data()
            success = True
            print("Successful grabbed news data for %s." % (src.get_stock()))
        except RuntimeError:
            attempts += 1
            continue

    if not success:
        print("Failed to grab news data for %s." %
              (src.get_stock()))
    else:
        # send to data pipeline
        to_pipeline(response_df)

def main(fmp_key, stock_list):
    sources = []
    for stock in stock_list:
        sources.append(GeneralNewsData(fmp_key, stock))

    with concurrent.futures.ProcessPoolExecutor() as executor:
        executor.map(retrieve_news_data, sources)

    print("Exiting Main Thread")
    return 1

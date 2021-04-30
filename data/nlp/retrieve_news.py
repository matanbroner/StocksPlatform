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
    while not success:
        try:
            response_df = src.retrieve_data()
            success = True
        except RuntimeError:
            continue

    # send to data pipeline
    thread_lock.acquire()
    pl_queue.put(response_df)
    #to_pipeline(response_df)
    thread_lock.release()

def main(fmp_key, stock_list):
    sources = []
    for stock in stock_list:
        sources.append(GeneralNewsData(fmp_key, stock))

    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.map(retrieve_news_data, sources)

    print(pl_queue.qsize())
    print("Exiting Main Thread")
    return 1

# multithreading support
import threading
import time

import pandas as pd

from nlp.news_sources import GeneralNewsData, RedditData

from nlp.nlp import NLPUnit

thread_lock = threading.Lock()
threads = []

class Thread(threading.Thread):
    """
    Thread class for handling news sources. Each source will get its own thread.
    """

    def __init__(self, id, src, freq):
        """
        @param id: thread id
        @param src: news source object
        @param freq: # of searches per min
        """
        threading.Thread.__init__(self)
        self.id = id
        self.src = src
        self.freq = freq

    def run(self):
        """
        Called when thread is started.
        """

        while True:
            response_df = self.src.retrieve_data()

            nlp = NLPUnit(self.src.get_stock(), response_df)
            
            thread_lock.acquire()

            thread_lock.release()

            time.sleep(60 / self.freq)

def main(fmp_key):
    NEWS_SOURCES = [GeneralNewsData(fmp_key, "AAPL"), GeneralNewsData(fmp_key, "GME"),GeneralNewsData(fmp_key, "TSLA")]

    # create new threads
    for i in range(len(NEWS_SOURCES)):
        threads.append(Thread(i + 1, NEWS_SOURCES[i], 1 / 60))

    # start new threads
    for t in threads:
        t.start()

    # wait for all threads to complete
    for t in threads:
        t.join()

    #print(sentiment_data)
    print("Exiting Main Thread")

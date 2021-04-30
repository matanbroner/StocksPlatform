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
        response_df = self.src.retrieve_data()

<<<<<<< HEAD
        while True:
            source, date, content = self.src.retrieve_data()
            print(source, date, content)
            # nlp = NLPUnit(source, date, context)
            thread_lock.acquire()
=======
        nlp = NLPUnit(self.src.get_stock(), response_df)
>>>>>>> 6495917061dad774c16f588a298910166a45bcf1

        thread_lock.acquire()
        # save data to db
        thread_lock.release()


<<<<<<< HEAD

thread_lock = threading.Lock()
threads = []
=======
def main(fmp_key, news_sources):
    sources = []
    for source in news_sources:
        sources.append(GeneralNewsData(fmp_key, source))
>>>>>>> 6495917061dad774c16f588a298910166a45bcf1

    # create new threads
    for i in range(len(sources)):
        threads.append(Thread(i + 1, sources[i], 1 / 60))

    # start new threads
    for t in threads:
        t.start()

    # wait for all threads to complete
    for t in threads:
        t.join()

<<<<<<< HEAD
# print(sentiment_data)
print("Exiting Main Thread")
=======
    print("Exiting Main Thread")
    return 1
>>>>>>> 6495917061dad774c16f588a298910166a45bcf1

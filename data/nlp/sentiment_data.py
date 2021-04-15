# multithreading support
import threading
import time

from api.news_sources import GeneralNewsData, RedditData

from nlp import NLPUnit

NEWS_SOURCES = [GeneralNewsData(), RedditData("stocks")]
SEARCH_RATES = [1/60, 1/60]

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
            source, date, content = self.src.retrieve_data()
            print(source, date, content)
            #nlp = NLPUnit(source, date, context)
            thread_lock.acquire()

            thread_lock.release()

            time.sleep(60 / self.freq)


print("hello")
thread_lock = threading.Lock()
threads = []

# create new threads
for i in range(len(NEWS_SOURCES)):
    threads.append(Thread(i + 1, NEWS_SOURCES[i], SEARCH_RATES[i]))

# start new threads
for t in threads:
    t.start()

# wait for all threads to complete
for t in threads:
    t.join()

#print(sentiment_data)
print("Exiting Main Thread")

# source: https://stackoverflow.com/a/31088851
import threading
import os

from nlp.retrieve_news import main as retrieve_news

from db.handlers.stock_handler import get_all_stocks


class ThreadTimer(threading.Thread):
    def __init__(self, interval, callback, *args):
        """
        Runs the callback function after interval seconds.

        @param interval: time in seconds after which are required to fire the callback
        @param callback:  callback function to invoke
        @param *args: arguments for callback
        """
        self.callback = callback
        self.event = threading.Event()
        self.interval = interval
        self.args = args
        self.stock_set = set()
        super(ThreadTimer, self).__init__()

    def run(self):
        while not self.event.wait(self.interval):
            stock_db_list = get_all_stocks()
            for stock in stock_db_list:
                self.stock_set.add(stock['ticker'])

            self.callback(*self.args, self.stock_set)


def init_news_retrieval(fmp_key: str = None, sec_delay: int = 60):
    fmp_key = os.getenv("FMP_KEY") or fmp_key

    if fmp_key == None:
        raise RuntimeError(f"No API key for Financial Modeling Prep given.")

    t = ThreadTimer(sec_delay, retrieve_news, fmp_key)
    t.start()


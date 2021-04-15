from datetime import datetime

import pandas as pd

from api.fmp.fmp import FinancialModelingPrepApi as FMPApi
from praw import Reddit

class GeneralNewsData:
    """
    Grabs data about general news using the FMP api.
    @param api: FMP api object
    @param search_rate = searches per hour
    """
    def __init__(self, key, stock_ticker):
        """
        @param key: FMP api key
        @param stock_ticker: stock ticker to search news about ex. TSLA
        """
        self.api = FMPApi(key)
        self.stock = stock_ticker

    def get_stock(self):
        return self.stock

    def retrieve_data(self):
        """
        Retrieves data using FMPApi
        @return: DataFrame with columns source, date, content
        """

        json_response = self.api.get_news([self.stock])

        # convert json response to DataFrame with appropriately named columns
        df = pd.DataFrame(json_response, columns=['site', 'publishedDate', 'text'])
        df['publishedDate'] = pd.to_datetime(df['publishedDate'], infer_datetime_format=True).dt.date
        df = df.rename(columns={"site": "source", "publishedDate": "date", 'text': 'content'})
        
        return df

class RedditData:
    def __init__(self, subreddit):
        self.api = Reddit(
            client_id='',
            client_secret='',
            user_agent=''
        )

        self.subreddit = self.api.subreddit(subreddit)

    def _unix_time_to_date(self, unix_time):
        """
        Converts UTC Unix time to YYYY-MM-DD format.
        @param unix_time
        @return: date
        """
        return datetime.fromtimestamp(unix_time).date()

    def retrieve_data(self):
        """
        Retrieves data using Praw
        @return: src, date, content
        """
        dates = []
        content = []

        # look through top 10 submissions in hot in r/subreddit
        for submission in self.subreddit.hot(limit=3):
            if not submission.stickied:

                # ignore "load more comments"
                submission.comments.replace_more(limit=0)

                for top_level_comment in submission.comments:
                    dates.append(self._unix_time_to_date(top_level_comment.created_utc))
                    content.append(top_level_comment.body)

        return self.subreddit, dates, content

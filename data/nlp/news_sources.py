from datetime import datetime

import pandas as pd

from api.fmp import FinancialModelingPrepApi as FMPApi

from praw import Reddit


class GeneralNewsData:
    """
    Grabs data about general news using the FMP api.
    @param api: FMP api object
    @param stock = stock ticker to search news for
    """
    def __init__(self, key, stock_ticker):
        """
        @param key: FMP api key
        @param stock_ticker: stock ticker to search news about ex. TSLA
        """
        self.api = FMPApi(key)
        self.stock = stock_ticker

    def _create_articles_df(self, json_data):
        """
        Creates and returns a DataFrame with the following columns:
            stock
            source
            date
            title
            url
            content
        @param json_data: FMP stock news json response
        @return: DataFrame described above
        """
        df = pd.DataFrame(json_data, columns=['site', 'publishedDate', 'title', 'url', 'text'])
        df['publishedDate'] = pd.to_datetime(df['publishedDate'], infer_datetime_format=True).dt.date
        df.insert(0, 'stock', value=self.stock)
        return df.rename(columns={'site': 'source', 'publishedDate': 'date', 'text': 'content'})

    def get_stock(self):
        """
        Gets the stock ticker that the instance of GeneralNewsApi is searching news for.
        @return: stock ticker
        """
        return self.stock

    def retrieve_data(self):
        """
        Retrieves data using FMPApi
        @return: DataFrame with columns stock, source, date, title, url, content
        """

        json_response = self.api.get_news([self.stock])
        
        if len(json_response) == 0:
            print("No news data found for %s." % (self.stock))
            return None
        
        return self._create_articles_df(json_response)

class RedditData:
    """
    Grabs data from Reddit using the Praw API. 
    @param client_id: ID of application. Found at https://www.reddit.com/prefs/apps.
    @param client_secret: secret API key of application. Found at same place as client_id.
    @param subreddit: name of subreddit you want to search
    """
    def __init__(self, client_id, client_secret, subreddit):
        self.api = Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent='StocksPlatform'
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

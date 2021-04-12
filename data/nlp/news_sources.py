from datetime import datetime

import json

from api.fmp.fmp import FinancialModelingPrepApi as FMPApi  # this import doesn't work
from praw import Reddit

class GeneralNewsData:
    def __init__(self):
        self.api = FMPApi("key")

    def retrieve_data(self):
        """
        Retrieves data using FMPApi
        @return: src, date, content
        """

        print(json.loads(self.api.get_news("AAPL")))

        return 'source', 'date', 'content'

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
        @param: unix_tie
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

import pandas as pd

class NLPUnit:
    """
    Processes data retrieved from news sources.
    @param df: DataFrame containing the following columns:
        source
        date
        content
        stock
    """
    def __init__(self, stock, data):
        self.df = data
        self.df['stock'] = stock
        
        # seb
        self.stock = None
        self.source = None

        # aj
        self.date = None
        self.industry = None

        # aj
        self.category = None

        # seb
        self.sentiment = None

    def determine_category(self, text):
        """
        Determine category for news. -AJ
        """
        pass

    def determine_sentiment(self, text):
        """
        Determine sentiment for news. -Seb
        """
        pass

    def save(self):
        """
        Save to sentiment
        """
        pass

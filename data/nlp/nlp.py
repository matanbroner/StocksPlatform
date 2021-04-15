import pandas as pd

class NLPUnit:
    def __init__(self):
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


    "Apple being sued for workplace discrimination."

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

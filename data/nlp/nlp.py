import pandas as pd
import re
import numpy as np

import nlp.sentiment_algorithms as algos
from nlp.word_cloud import NLPWordCloud

class NLPUnit:
    """
    Processes data retrieved from news sources.
    @param df: DataFrame containing the following columns:
        stock
        source
        date
        title
        content
    """
    def __init__(self, data):
        self.df = data

    def _remove_pattern(self, text, pattern):
        """
        Removes a specified pattern from the text.
        @param text: text to have pattern removed from
        @param pattern: pattern that to be removed
        @return: text with all instances of pattern removed
        """
        r = re.findall(pattern, text)

        for i in r:
            text = re.sub(i, '', text)

        return text

    def get_df(self):
        return self.df

    def get_df_col(self, col):
        return self.df[col]
    
    def get_word_cloud(self, image_url=None):
        all_words_str = ' '.join(token.text for token in self.df['doc'])
        return NLPWordCloud(all_words_str, image_url)

    def determine_category(self, text):
        """
        Determine category for news.
        """
        pass

    def determine_sentiment(self):
        """
        Determine sentiment for news.
        """
        self.df['title sentiment'] = np.vectorize(algos.sentiment_value)(self.df['doc'])

    def save(self):
        """
        Save to database.
        """
        pass

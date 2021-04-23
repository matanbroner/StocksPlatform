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
        content
    """
    def __init__(self, stock, data):
        self.df = data
        
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

        self._pre_process()

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

    def _pre_process(self):
        """
        Handles the data pre-processing.
        @return: None
        """
        self.df['clean title'] = np.vectorize(algos.clean_sentence)(self.df['title'])
    
    def get_word_cloud(self, image_url=None):
        all_words_str = ' '.join(text for text in self.df['clean title'])
        return NLPWordCloud(all_words_str, image_url)

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

import pandas as pd
import re
import numpy as np

import matplotlib.pyplot as plt
from wordcloud import WordCloud

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

    def _print_word_cloud(self, image_url, word_list):
        """
        Generates a word cloud to more easily look at common words.
        @param image_url: image url for shape/visual of word cloud.
        @param word_list: words to be in word cloud
        @return: None
        """

        wc = WordCloud(background_color='black', height=1500, width=4000)
        wc.generate(word_list)

        plt.figure(figsize=(10, 20))
        plt.imshow(wc, interpolation='hamming')

        plt.axis('off')
        plt.show()

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

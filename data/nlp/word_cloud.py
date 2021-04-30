import numpy as np
import matplotlib.pyplot as plt
from wordcloud import WordCloud, ImageColorGenerator
from PIL import Image
import random
import urllib
import requests

class NLPWordCloud:
    def __init__(self, all_words_str, image_url=None):
        self.wc = self.generate(all_words_str, image_url)

    def generate(self, all_words, image_url):
        """
        Generates a word cloud to more easily look at common words.
        @param image_url: image url for shape/visual of word cloud.
        @return: None
        """
        mask = None
        image_colors = None
        if image_url:
            mask = np.array(Image.open(requests.get(image_url, stream=True).raw))

            # getting colors from image. will use later to recolor word cloud
            image_colors = ImageColorGenerator(mask)
            
        wc = WordCloud(background_color='black', height=1500, width=4000, mask=mask)

        wc = wc.generate(all_words)

        return wc.recolor(color_func=image_colors)

    def show(self):
        """
        Plots word cloud.
        IMPORTANT: Must use in main thread. Will crash otherwise.
        """
        plt.imshow(self.wc, interpolation='hamming')

        plt.axis('off')
        plt.show()

import spacy
from spacy.language import Language
from spacy.tokens.doc import Doc

from nlp.retrieve_news import lock
from nlp.sentiment_algorithms import sentiment_value

from db.handlers.stock_handler import (
    get_stock_by_ticker,
    create_stock
)

from db.handlers.news_source_handler import (
    get_news_source_by_name,
    create_news_source
)

from db.handlers.news_articles_handler import (
    get_news_article_by_ticker_and_source_and_headline,
    create_news_article
)

def to_pipeline(nlp_df):
    """
    Sends data to pipeline manager.
    """
    #print("Sending to pipeline...")
    pipeline_manager(nlp_df)

@Language.component("text_clean")
def text_clean_pipe(doc):
    """
    Removes tokens that are tagged as punctuation or stop words.
    @param doc: spacy.tokens.doc.Doc
    @return: cleaned doc
    """
    token_list = [token.text for token in doc if not token.is_punct | token.is_stop]

    return Doc(doc.vocab, words=token_list)

def filter_news(news_df):
    """
    Filters out news that is already in the database so repeats are not processed.
    @param news_df: DataFrame with news articles
    @return: filtered news DataFrame
    """
    for i, row in news_df.iterrows():
        # find article in database
        try:
            article = get_news_article_by_ticker_and_source_and_headline(
                row['stock'],
                row['source'], 
                row['title']
                )
        except:
            article = None

        # if article exists, delete from DataFrame
        if article is not None:
            #print("Dropping news article...")
            news_df = news_df.drop(i)

    return news_df

def pre_process(texts):
    """
    Pre-processing stage of pipeline. Uses spaCy to clean and tag text.
    @param texts: list/iter of strings
    @return: list of pre processed texts
    """
    return list(nlp.pipe(texts, batch_size=20))

def determine_sentiment(docs):
    """
    Sentiment stage of pipeline. Calculates sentiment value for each of the docs.
    @param docs: list of docs created by spaCy pre-processing
    @return: list of sentiment values
    """
    sentiment_list = []
    for doc in docs:
        text = ' '.join([token.text for token in doc])
        sentiment_list.append(sentiment_value(text))

    return sentiment_list

def save_data(df):
    """
    Saves data from DataFrame to database.
    Note: Be wary of race conditions when saving.
    @param df: DataFrame with necessary data, don't necessarily need to store all columns
    @return: List of UUIDs of articles created
    """
    lock.acquire()
    #print("Lock acquired by", df['stock'][0])

    article_ids = []
    for i, row in df.iterrows():
        try:
            source = get_news_source_by_name(row['source'])
            if source is None:
                print(row['source'], "doesn't exist. Creating now.")
                source = create_news_source(row['source'])

            stock = get_stock_by_ticker(row['stock'])
            if stock is None:
                print(row['stock'], "doesn't exist. Creating now.")
                stock = create_stock(row['stock'])
                
            article = create_news_article(
                source['id'], 
                stock['id'], 
                row['sentiment'], 
                row['title'],
                row['url'],
                row['date'])

            article_ids.append(article['id'])

        except Exception as e:
            #print("Error while saving data for", df['stock'][0] + ":", e)
            continue

    #print("Lock being released by", df['stock'][0])
    lock.release()
    return article_ids

def pipeline_manager(nlp_df):
    """
    Manages all stages of pipeline.
    """

    # filter out repeated news articles
    #print("Filtering news articles for", nlp_df['stock'][0] + "...")
    nlp_df = filter_news(nlp_df)

    # only send to rest of pipeline if there is still data to be processed after filtering
    if not nlp_df.empty:
        # pre-processing stage
        #print("Pre-processing", nlp_df['stock'][0] + "...")
        nlp_df['doc'] = pre_process(iter(nlp_df['title']))
        
        # sentiment value calculation stage
        #print("Calculating sentiment for", nlp_df['stock'][0] + "...")
        nlp_df['sentiment'] = determine_sentiment(nlp_df['doc'])

        # save to database stage
        #print("Saving data for", nlp_df['stock'][0] + "...")
        save_data(nlp_df)

    #print(nlp_df.head(5))
    #print("Exiting pipeline...")

nlp = spacy.load("en_core_web_sm", disable=['tok2vec'])
nlp.add_pipe('text_clean', last=True)

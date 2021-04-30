import spacy
from spacy.language import Language
from spacy.tokens.doc import Doc

import queue

from nlp.nlp import NLPUnit

pl_queue = queue.Queue()

def to_pipeline(nlp_df):
    pre_process(nlp_df)

@Language.component("text_clean")
def text_clean_pipe(doc):
    """
    Removes tokens that are tagged as punctuation or stop words.
    @param doc: spacy.tokens.doc.Doc
    @return: cleaned doc
    """
    token_list = [token.text for token in doc if not token.is_punct | token.is_stop]

    return Doc(doc.vocab, words=token_list)

def pre_process(nlp_df):
    print("Starting pre-processing for %s..." % (nlp_df['stock'].iloc[0]))
    nlp = spacy.load("en_core_web_sm", disable=['tok2vec'])
    nlp.add_pipe("text_clean", last=True)
    nlp_df['doc'] = list(nlp.pipe(nlp_df['title'], batch_size=50))
    # nlp = NLPUnit(nlp_df)
    # nlp.pre_process()
    print("Finished pre-processing for %s." % (nlp_df['stock'].iloc[0]))
    # wc = NLPUnit(nlp_df).get_word_cloud()
    # wc.show()
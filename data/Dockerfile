FROM python:3.6

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./requirements.txt ./

RUN pip install -r requirements.txt

RUN python -m nltk.downloader stopwords
RUN python -m nltk.downloader vader_lexicon
RUN python -m nltk.downloader punkt
RUN python -m spacy download en_core_web_sm

# Bundle app source
COPY . /app

EXPOSE 5000
CMD [ "python", "main.py" ]
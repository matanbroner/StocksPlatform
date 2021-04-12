import os
import requests
from urllib.parse import urlencode

"""
API wrapper for the MediaStack news API.
Allows access to live and historical news for queried topics.

Documentation: https://mediastack.com/documentation
"""

DEFAULT_QUERY_LIMIT = 50


class MediaStackApi:
    def __init__(self, api_key: str = None, query_limit: int = None):
        self.api_key = api_key or os.environ['MS_API_KEY']
        self.query_limit = query_limit or DEFAULT_QUERY_LIMIT
        if not self.api_key:
            self._raise_error("No valid MediaStack API key provided")

    def _raise_error(self, msg: str):
        """
        Generic error function for MS
        @param msg
        @return: None
        """
        raise RuntimeError(f"MediaStack Error: {msg}")

    def _api_request(self, query: dict = {}):
        """
        Generic API request handler for MS
        @param route
        @param query: converted to query string
        @return: JSON or raise RuntimeError
        """
        query_string = f"access_key={self.api_key}&" + urlencode(query)
        url = f"https://api.mediastack.com/v1/news?{query_string}"
        response = requests.request(
            "GET",
            url=url
        )
        body = response.json()
        if "error" in body:
            self._raise_error(body["error"]["message"])
        else:
            return body

    def get_news(self, keywords: list = None, sources: list = None, categories: list = None, countries: list = None,
                 sort: str = None, offset: int = 0, date: str = None):
        """
        Generic news fetching method, allows for live or historical news fetching
        @param sources: ex. ["cnn", "-bbc"] (- excludes a source)
        @param categories: ex. ["business", "-sports"] (- excludes a category)
        @param countries: ex. ["au", "-us"] (- excludes a country)
        @param date: ex. "2020-01-01" use YYYY-MM-DD
        @param sort: one of ["published_desc" (default), "published_asc", "popularity"]
        @param offset: ex. 100
        @return: JSON
        """
        query = {}
        if keywords: query["keywords"] = keywords
        if sources: query["sources"] = sources
        if categories: query["categories"] = categories
        if countries: query["countries"] = countries
        if sort: query["sort"] = sort
        if offset: query["offset"] = offset

        # Note: using "date" causes historical news to be fetched!
        if date: query["date"] = date
        return self._api_request(query)

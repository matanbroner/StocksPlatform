import os
import requests

"""
API wrapper for the Financial Modeling Prep service.
Note on rate limiting from FMP TOS:

A rate limiter that limits the number of requests received by the API within any given second. 
For most APIs, Financial Modeling Prep allows up to 10 requests per second. 
Treat these limits as maximums and don’t generate unnecessary load.

"""

DEFAULT_QUERY_LIMIT = 50


class FinancialModelingPrepApi:
    def __init__(self, api_key: str = None, query_limit: int=None):
        self.api_key = api_key or os.environ['FMP_API_KEY']
        self.query_limit = query_limit or DEFAULT_QUERY_LIMIT
        if not self.api_key:
            self._raise_error("No valid FinancialModelingPrep API key provided")

    def _raise_error(self, msg: str):
        """
        Generic error function for FMP
        @param msg
        @return: None
        """
        raise RuntimeError(f"FinancialModelingPrep Error: {msg}")

    def _api_request(self, route: str, method: str = "GET", data: dict = {}, headers: dict = {}, api_v: str = "v3"):
        """
        Generic API request handler for FMP
        @param route
        @param method: one of ["GET", "POST", "PUT"]
        @param data
        @param headers
        @param api_v: generally one of ["v3", "v4"]
        @return: JSON or raise RuntimeError
        """
        url = f"https://financialmodelingprep.com/api/{api_v}/{route}"
        if '?' in url:
            url += f"&apikey={self.api_key}"
        else:
            url += f"?apikey={self.api_key}"
        response = requests.request(
            method,
            url=url,
            data=data,
            headers=headers
        )
        body = response.json()
        if "Error Message" in body:
            self._raise_error(body["Error Message"])
        else:
            return body

    def company_profile(self, ticker: str):
        """
        Search for a company's profile
        @param ticker: ex. "TSLA"
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/companies-key-stats-free-api
        """
        route = f"profile/{ticker}"
        return self._api_request(route=route)

    def get_statement_by_type(self, ticker: str, statement_type: str, growth: bool = False, period: str = "quarter",
                              limit: int = None,
                              datatype: str = None):
        """
        Fetch company income statement on quarter or yearly increments
        @param ticker: ex. "TSLA"
        @param statement_type: one of ["income", "cash-flow", "balance-sheet"]
        @param growth: get growth statement instead of base statement
        @param period: one of ["quarter", "annual"]
        @param limit
        @param datatype: use "csv" for downloadable file
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/financial-statement-free-api#Income-Statement
        """
        if statement_type not in ["income", "cash-flow", "balance-sheet"]:
            self._raise_error(f"Statement type '{statement_type}' is not valid")
        statement_type += "-statement"
        if growth:
            statement_type += "-growth"
        if not limit: limit = self.query_limit
        route = f"{statement_type}/{ticker}?period={period}&limit={limit}"
        if datatype:
            route += f"&datatype={datatype}"
        return self._api_request(route=route)

    def get_all_statements(self, ticker: str, growth: bool = False, period: str = "quarter", limit: int = None,
                           datatype: str = None):
        """
        Collect income, balance sheet, and cash flow statements for a company all at once
        Is atomic, if one of three calls fail, entire method fails.
        @param ticker: ex. "TSLA"
        @param growth: get growth statements instead of base statements
        @param period: one of ["quarter", "annual"]
        @param limit
        @param datatype: use "csv" for downloadable file
        @return: JSON
        """
        if not limit: limit = self.query_limit
        statement_types = ["income", "cash-flow", "balance-sheet"]
        statements = {}
        try:
            for type in statement_types:
                statements[type] = self.get_statement_by_type(ticker=ticker, growth=growth, statement_type=type,
                                                              period=period,
                                                              limit=limit, datatype=datatype)
            return statements
        except RuntimeError as e:
            # relay error back to user
            raise e

    def get_ratios(self, ticker: str, ttm: bool = False, period: str = "quarter", limit: int = None):
        """
        Get company financial ratios either TTM or on a periodic basis
        @param ticker: ex. "TSLA"
        @param ttm: get TTM ratios rather than periodic
        @param period: one of ["quarter", "annual"], cannot be used with TTM
        @param limit: cannot be used with TTM
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/#Company-Financial-Ratios
        """
        route = "ratios"
        if ttm:
            route += f"-ttm/{ticker}"
        else:
            if not limit: limit = self.query_limit
            route += f"/{ticker}?period={period}&limit={limit}"
        return self._api_request(route=route)

    def get_enterprise_value(self, ticker: str, period: str = "quarter", limit: int = None):
        """
        Get enterprise value for a company
        @param ticker: ex. "TSLA"
        @param period: one of ["quarter", "annual"]
        @param limit
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/#Company-Enterprise-Value
        """
        if not limit: limit = self.query_limit
        route = f"enterprise-values/{ticker}?period={period}&limit={limit}"
        return self._api_request(route=route)

    def get_company_growth(self, ticker: str, period: str = "quarter", limit: int = None):
        """
        Get growth financial statement for a company
        @param ticker: ex. "TSLA"
        @param period: one of ["quarter", "annual"]
        @param limit
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/#Company-Financial-Growth
        """
        if not limit: limit = self.query_limit
        route = f"financial-growth/{ticker}?period={period}&limit={limit}"
        return self._api_request(route=route)

    def get_rating(self, ticker: str, historical: bool = False, limit: int = None):
        """
        Get rating for company, either immediate or historical
        @param ticker: ex. "TSLA"
        @param historical: get historical ratings
        @param limit
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/companies-rating-free-api
        """
        route = "historical-rating" if historical else "rating"
        route += f"/{ticker}"
        if historical:
            if not limit: limit = self.query_limit
            route += f"?limit={limit}"
        return self._api_request(route=route)

    def get_dcf(self, ticker: str, historical: bool = False, period: str = "quarter", limit: int = None):
        """
        Get discounted cash flow for a company
        @param ticker: ex. "TSLA"
        @param historical: get historical DCF
        @param limit
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/#Company-Discounted-cash-flow-value
        """
        route = f"discounted-cash-flow/{ticker}"
        if historical:
            if not limit: limit = self.query_limit
            route = f"historical-{route}?period={period}&limit={limit}"
        return self._api_request(route=route)

    def get_batch_price(self, tickers: list):
        """
        Batch request prices for multiple companies
        @param tickers: ex. ["TSLA", "AAPL"]
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/companies-batch-request-free-api/
        """
        for ticker in tickers:
            if not isinstance(ticker, str):
                self._raise_error(f"Invalid ticker symbol {ticker} in batch price request")
        str_tickers = ",".join(tickers)
        route = f"quote/{str_tickers}"
        return self._api_request(route=route)

    def get_news(self, tickers: list=None, limit: int=None):
        """
        Get news for multiple companies or most recent news in general
        @param tickers: ex. ["TSLA", "AAPL"]
        @param limit
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/#Stock-News
        """
        if not limit: limit = self.query_limit
        route = f"stock_news?limit={limit}"
        if tickers:
            for ticker in tickers:
                if not isinstance(ticker, str):
                    self._raise_error(f"Invalid ticker symbol {ticker} in news request")
            str_tickers = ",".join(tickers)
            route += f"&tickers={str_tickers}"
        return self._api_request(route=route)

    def get_earnings_surprises(self, ticker: str):
        """
        Get earning surprises (ie. actual > estimate) for a company
        @param ticker: ex. "TSLA"
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/#Earnings-Surprises
        """
        route = f"earnings_surprises/{ticker}"
        return self._api_request(route=route)

    def get_real_time_price(self, ticker: str):
        """
        Get real time price for a company's stock
        @param ticker: ex. "TSLA"
        @return: JSON
        """
        route = f"quote-short/{ticker}"
        return self._api_request(route=route)

    def get_historical_price(self, ticker: str, interval: str):
        """
        Get historical price data for a company's stock
        @param ticker: ex. "TSLA"
        @param interval: one of ["1m", "5m", "15m", "30m", "1h", "4h", "all"]
        @return: JSON
        """
        if interval not in ["1m", "5m", "15m", "30m", "1h", "4h", "all"]:
            self._raise_error(f"Interval {interval} is not valid in price request")

        if interval[-1] == 'm':
            interval = f"{interval}in"
        elif interval[-1] == 'h':
            interval = f"{interval}our"

        if interval == "all":
            route = f"historical-price-full/{ticker}"
        else:
            route = f"historical-chart/{interval}/{ticker}"

        return self._api_request(route=route)

    def get_most_active_stocks(self):
        """
        Get most active stocks
        @return: JSON
        """
        route = "actives"
        return self._api_request(route=route)

    def get_most_gainer_stocks(self):
        """
        Get most gainer stocks
        @return: JSON
        """
        route = "gainers"
        return self._api_request(route=route)

    def get_most_loser_stocks(self):
        """
        Get most loser stocks
        @return: JSON
        """
        route = "losers"
        return self._api_request(route=route)

    def get_key_stocks(self):
        """
        Returns most active, gainer, and loser stocks in one call
        Is atomic, if one call fail entire method raises an error
        @return: JSON
        """
        stocks = {}
        stocks["active"] = self.get_most_active_stocks()
        stocks["gainers"] = self.get_most_gainer_stocks()
        stocks["losers"] = self.get_most_loser_stocks()
        return stocks

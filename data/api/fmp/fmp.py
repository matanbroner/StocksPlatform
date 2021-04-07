import os
import requests

"""
API wrapper for the Financial Modeling Prep service.
Note on rate limiting from FMP TOS:

A rate limiter that limits the number of requests received by the API within any given second. 
For most APIs, Financial Modeling Prep allows up to 10 requests per second. 
Treat these limits as maximums and don’t generate unnecessary load.

"""


class FinancialModelingPrepApi:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ['FMP_API_KEY']
        self.query_limit = 50
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
        @return: json object or raise RuntimeError
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
        @param limit:cannot be used with TTM
        @return: JSON
        """
        route = "ratios"
        if ttm:
            route += f"-ttm/{ticker}"
        else:
            if not limit: limit = self.query_limit
            route += f"/{ticker}?period={period}&limit={limit}"
        return self._api_request(route=route)

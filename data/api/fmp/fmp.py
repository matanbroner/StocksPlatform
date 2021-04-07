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

    def get_statement_by_type(self, ticker: str, statement_type: str, period: str = "quarter", limit: int = None,
                              datatype: str = None):
        """
        Fetch company income statement on quarter or yearly increments
        @param ticker: ex. "TSLA"
        @param statement_type: one of ["income", "cash-flow", "balance-sheet"]
        @param period: one of ["quarter", "annual"]
        @param limit
        @param datatype: use "csv" for downloadable file
        @return: JSON
        ref: https://financialmodelingprep.com/developer/docs/financial-statement-free-api#Income-Statement
        """
        if statement_type not in ["income", "cash-flow", "balance-sheet"]:
            self._raise_error(f"Statement type '{statement_type}' is not valid")
        if not limit: limit = self.query_limit
        route = f"{statement_type}-statement/{ticker}?period={period}&limit={limit}"
        if datatype:
            route += f"&datatype={datatype}"
        return self._api_request(route=route)

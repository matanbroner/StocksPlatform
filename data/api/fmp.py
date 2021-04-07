import os
import requests

class FinancialModelingPrepApi:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ['FMP_API_KEY']
        if not self.api_key:
            self._raise_error("No valid FinancialModelingPrep API key provided")

    def _raise_error(self, msg: str):
        raise RuntimeError(f"FinancialModelingPrep Error: {msg}")

    def _api_request(self, method: str, route: str, data: dict={}, headers: dict={}, api_v: str="v3"):
        url = f"https://financialmodelingprep.com/api/{api_v}/{route}?apikey=${self.api_key}"
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


import requests

BASE_URL = "http://banana-stocks.com/api"

projects = [
    {
        "project_name": "Banking",
        "description": "Various US based banks",
        "tickers": ["JPM", "BAC", "COF", "WFC"],
    },
    {
        "project_name": "Metals",
        "description": "Metal companies",
        "tickers": ["WPM", "X", "FNV"],
    },
    {
        "project_name": "Smartphone Producers",
        "description": "Smartphone market leader",
        "tickers": ["AAPL", "GOOGL", "NOK", "MSI"],
    },
    {
        "project_name": "Social Media",
        "description": "Tweets make the market run!",
        "tickers": ["TWTR", "FB"],
    },
    {
        "project_name": "Auto",
        "description": "Are EV's here to stay?",
        "tickers": ["TSLA", "HMC", "F", "TM"],
    },
    {
        "project_name": "Meme Stocks",
        "description": "To the moon!",
        "tickers": ["GME", "AMC"],
    }
]

res = requests.post(
    f"{BASE_URL}/users/users/login",
    json={"email": "mbroner@ucsc.edu", "password": "12345"},
)

token = res.json().get("data", {}).get("accessKey")
if not token:
    raise RuntimeError("Failed login")

res = requests.get(
    f"{BASE_URL}/data/project/", headers={"Authorization": f"Bearer {token}"}
)

existing_projects = res.json().get("data", [])
for existing in existing_projects:
    match = next(
        (
            project
            for project in projects
            if project["project_name"] == existing["project_name"]
        ),
        None,
    )
    if match:
        id = existing["id"]
        requests.delete(
            f"{BASE_URL}/data/project/{id}",
            headers={"Authorization": f"Bearer {token}"},
        )

for project in projects:
    requests.post(
        f"{BASE_URL}/data/project/",
        json=project,
        headers={"Authorization": f"Bearer {token}"},
    )
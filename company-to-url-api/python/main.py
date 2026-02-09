import os
import sys
import json
import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

api_key = os.getenv("BUILTWITH_API_KEY")
company = os.getenv("COMPANY", "BuiltWith")

if not api_key or api_key == "your-api-key-here":
    print("Error: Set a valid BUILTWITH_API_KEY in your .env file.", file=sys.stderr)
    print("Get your API key at https://api.builtwith.com", file=sys.stderr)
    sys.exit(1)

print("BuiltWith Company to URL API")
print(f"Company: {company}")
print("---")

response = requests.get("https://api.builtwith.com/ctu3/api.json", params={"KEY": api_key, "COMPANY": company})
response.raise_for_status()
print(json.dumps(response.json(), indent=2))

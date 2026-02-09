import os
import sys
import json
import asyncio
import requests
import websockets
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

api_key = os.getenv("BUILTWITH_API_KEY")
slack_webhook_url = os.getenv("SLACK_WEBHOOK_URL")
channels = [ch.strip() for ch in os.getenv("BUILTWITH_CHANNELS", "new").split(",") if ch.strip()]

if not api_key or api_key == "your-api-key-here":
    print("Error: Set a valid BUILTWITH_API_KEY in your .env file.", file=sys.stderr)
    print("Get your API key at https://api.builtwith.com", file=sys.stderr)
    sys.exit(1)

if not slack_webhook_url or slack_webhook_url == "your-slack-webhook-url-here":
    print("Error: Set a valid SLACK_WEBHOOK_URL in your .env file.", file=sys.stderr)
    print("Create a webhook at https://api.slack.com/messaging/webhooks", file=sys.stderr)
    sys.exit(1)

WEBSOCKET_URL = f"wss://sync.builtwith.com/wss/new?KEY={api_key}"
RECONNECT_DELAY = 5


def format_domain_message(data):
    domain = data.get("D") or data.get("domain") or "unknown"
    channel = data.get("C") or data.get("channel") or ""
    techs = data.get("T") or data.get("technologies") or []

    tech_list = "\n".join(f"  - {t}" for t in techs) if techs else "  (none listed)"

    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*New Domain Detected* — <https://{domain}|{domain}>",
                },
            },
            {
                "type": "section",
                "fields": [
                    {"type": "mrkdwn", "text": f"*Channel:*\n{channel}"},
                    {"type": "mrkdwn", "text": f"*Technologies:*\n{tech_list}"},
                ],
            },
            {"type": "divider"},
        ]
    }


def post_to_slack(payload):
    response = requests.post(slack_webhook_url, json=payload)
    response.raise_for_status()


async def connect():
    while True:
        try:
            print("Connecting to BuiltWith Live Feed...")
            async with websockets.connect(WEBSOCKET_URL) as ws:
                print("Connected to BuiltWith Live Feed.")

                for channel in channels:
                    await ws.send(json.dumps({"action": "subscribe", "channel": channel}))
                    print(f"Subscribed to channel: {channel}")

                async for raw in ws:
                    try:
                        data = json.loads(raw)
                    except json.JSONDecodeError:
                        print(f"Failed to parse message: {raw}")
                        continue

                    if "action" in data or "status" in data:
                        print(f"Control message: {json.dumps(data)}")
                        continue

                    domain = data.get("D") or data.get("domain")
                    if not domain:
                        print(f"Non-domain message: {json.dumps(data)}")
                        continue

                    print(f"Domain: {domain}")

                    try:
                        payload = format_domain_message(data)
                        post_to_slack(payload)
                    except Exception as e:
                        print(f"Failed to post {domain} to Slack: {e}")

        except (websockets.ConnectionClosed, ConnectionError, OSError) as e:
            print(f"WebSocket closed ({e}). Reconnecting in {RECONNECT_DELAY}s...")
            await asyncio.sleep(RECONNECT_DELAY)


print("BuiltWith Live Feed -> Slack")
print(f"Channels: {', '.join(channels)}")
print("---")

asyncio.run(connect())

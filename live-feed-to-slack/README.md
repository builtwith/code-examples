# BuiltWith Live Feed to Slack

Stream newly detected domains from the [BuiltWith Live Feed](https://api.builtwith.com) WebSocket into a Slack channel in real time.

## Prerequisites

- A **BuiltWith API key** — get one at [https://api.builtwith.com](https://api.builtwith.com)
- A **Slack Incoming Webhook URL** — create one at [https://api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)
- **Node.js** v14+ or **Python** 3.8+

## Setup — Node.js

1. Install dependencies:

   ```bash
   cd nodejs
   npm install
   ```

2. Copy the example environment file and fill in your keys:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your values:

   ```
   BUILTWITH_API_KEY=your-api-key-here
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
   BUILTWITH_CHANNELS=new,Shopify
   ```

4. Run:

   ```bash
   npm start
   ```

## Setup — Python

1. Install dependencies:

   ```bash
   cd python
   pip install -r requirements.txt
   ```

2. Copy the example environment file and fill in your keys:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your values:

   ```
   BUILTWITH_API_KEY=your-api-key-here
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
   BUILTWITH_CHANNELS=new,Shopify
   ```

4. Run:

   ```bash
   python main.py
   ```

## Configuration

| Variable | Description |
|---|---|
| `BUILTWITH_API_KEY` | Your BuiltWith API key |
| `SLACK_WEBHOOK_URL` | Slack Incoming Webhook URL |
| `BUILTWITH_CHANNELS` | Comma-separated channel list (see below) |

### Available Channels

| Channel | Description |
|---|---|
| `new` | Domains new to the pipeline where all technologies were first detected within the last day |
| `new-historical` | Domains new to the pipeline where all technologies were first detected more than 1 day ago |
| `premium` | New domains with at least one high-priority technology, first detected within the last day |
| `{technology}` | Any technology name, e.g. `Shopify`, `WordPress`, `Google-Analytics` (use `-` for spaces) |

## Project Structure

```
live-feed-to-slack/
  nodejs/
    config.js      - Loads and validates environment variables
    websocket.js   - WebSocket connection with auto-reconnect
    slack.js       - Slack webhook posting and message formatting
    index.js       - Entry point that wires everything together
  python/
    main.py        - Single-file implementation using websockets + requests
  .env.example     - Shared environment template
  README.md
```

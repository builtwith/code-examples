# BuiltWith Social API

Look up domains related to social media profiles.

## Prerequisites

- **Node.js** v14 or later
- A **BuiltWith API key** — get one at [https://api.builtwith.com](https://api.builtwith.com)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your key:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your values:

   ```
   BUILTWITH_API_KEY=your-api-key-here
   LOOKUP=twitter.com/builtwith
   ```

## Usage

```bash
npm start
```

Returns domains associated with the specified social media profile.

## Configuration

| Variable | Description |
|---|---|
| `BUILTWITH_API_KEY` | Your BuiltWith API key |
| `LOOKUP` | Social profile URL to look up (default: `twitter.com/builtwith`) |

## API Reference

- **Endpoint**: `https://api.builtwith.com/social1/api.json`
- **Method**: GET
- **Parameters**: `KEY`, `LOOKUP`

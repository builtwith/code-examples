# BuiltWith Tags API

Find domains related to IP addresses and site attributes.

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
   LOOKUP=builtwith.com
   ```

## Usage

```bash
npm start
```

Returns domains related to the specified IP address or site attribute.

## Configuration

| Variable | Description |
|---|---|
| `BUILTWITH_API_KEY` | Your BuiltWith API key |
| `LOOKUP` | IP address or site attribute to look up (default: `builtwith.com`) |

## API Reference

- **Endpoint**: `https://api.builtwith.com/tag1/api.json`
- **Method**: GET
- **Parameters**: `KEY`, `LOOKUP`

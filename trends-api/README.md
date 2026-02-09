# BuiltWith Trends API

Analyze technology adoption patterns and metrics over time.

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
   TECH=Shopify
   ```

## Usage

```bash
npm start
```

Returns trend data for the specified technology including adoption metrics and historical patterns.

## Configuration

| Variable | Description |
|---|---|
| `BUILTWITH_API_KEY` | Your BuiltWith API key |
| `TECH` | Technology name to analyze (default: `Shopify`) |

## API Reference

- **Endpoint**: `https://api.builtwith.com/trends/v6/api.json`
- **Method**: GET
- **Parameters**: `KEY`, `TECH`

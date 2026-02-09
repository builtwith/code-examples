# BuiltWith Product API

Find websites selling specific products.

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
   QUERY=headphones
   ```

## Usage

```bash
npm start
```

Returns websites that sell products matching the search query.

## Configuration

| Variable | Description |
|---|---|
| `BUILTWITH_API_KEY` | Your BuiltWith API key |
| `QUERY` | Product search query (default: `headphones`) |

## API Reference

- **Endpoint**: `https://api.builtwith.com/productv1/api.json`
- **Method**: GET
- **Parameters**: `KEY`, `QUERY`, `PAGE`, `LIMIT`

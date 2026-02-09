# BuiltWith Lists API

Get lists of websites using a specific technology, with support for filtering, meta data, and automatic pagination.

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

The script automatically pages through all results using the `NextOffset` value returned by the API.

## Configuration

Set these in your `.env` file:

| Variable | Required | Description |
|---|---|---|
| `BUILTWITH_API_KEY` | Yes | Your BuiltWith API key |
| `TECH` | Yes | Technology name to search for — use dashes for spaces (default: `Shopify`) |
| `META` | No | Set to `yes` to include meta data (names, titles, social links, addresses, emails, phone numbers, traffic ranks) |
| `COUNTRY` | No | Filter by country TLD/address — ISO 3166-1 alpha-2, comma-separated (e.g. `AU,NZ`). Use `UK` not `GB` |
| `SINCE` | No | Only return sites live since a date or relative time (e.g. `2024-01-20`, `30 Days Ago`, `Last January`) |
| `ALL` | No | Set to `yes` to include historical (non-live) sites. Cannot be used with `SINCE` |
| `OFFSET` | No | Resume from a specific page — use the `NextOffset` value from a previous response |

## Pagination

The API returns results in pages. Each response includes a `NextOffset` value:

- If `NextOffset` contains a token string, there are more results available
- If `NextOffset` is `END`, you have reached the last page

This example handles pagination automatically, fetching all pages until `NextOffset` is `END`.

## API Reference

- **Endpoint**: `https://api.builtwith.com/lists12/api.json`
- **Method**: GET
- **Parameters**: `KEY`, `TECH`, `META`, `COUNTRY`, `OFFSET`, `SINCE`, `ALL`

# BuiltWith Company to URL API

Find domains associated with a company name.

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
   COMPANY=BuiltWith
   ```

## Usage

```bash
npm start
```

Returns domains that are associated with the specified company name.

## Configuration

| Variable | Description |
|---|---|
| `BUILTWITH_API_KEY` | Your BuiltWith API key |
| `COMPANY` | Company name to search for (default: `BuiltWith`) |

## API Reference

- **Endpoint**: `https://api.builtwith.com/ctu3/api.json`
- **Method**: GET
- **Parameters**: `KEY`, `COMPANY`

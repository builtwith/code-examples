# BuiltWith Recommendations API

Get technology recommendations and suggestions for a domain.

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

Returns technology recommendations based on the specified domain's current stack.

## Configuration

| Variable | Description |
|---|---|
| `BUILTWITH_API_KEY` | Your BuiltWith API key |
| `LOOKUP` | Domain to get recommendations for (default: `builtwith.com`) |

## API Reference

- **Endpoint**: `https://api.builtwith.com/rec1/api.json`
- **Method**: GET
- **Parameters**: `KEY`, `LOOKUP`

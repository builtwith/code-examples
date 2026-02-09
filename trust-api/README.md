# BuiltWith Trust API

Evaluate trust and fraud signals for a domain.

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

Returns trust scoring and fraud indicators for the specified domain.

## Configuration

| Variable | Description |
|---|---|
| `BUILTWITH_API_KEY` | Your BuiltWith API key |
| `LOOKUP` | Domain to evaluate (default: `builtwith.com`) |

## API Reference

- **Endpoint**: `https://api.builtwith.com/trustv1/api.json`
- **Method**: GET
- **Parameters**: `KEY`, `LOOKUP`

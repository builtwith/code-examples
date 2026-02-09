# BuiltWith WhoAmI API

Verify your BuiltWith API credentials and check account status.

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
   ```

## Usage

```bash
npm start
```

Returns your account information including plan details and API access level.

## API Reference

- **Endpoint**: `https://api.builtwith.com/whoamiv1/api.json`
- **Method**: GET
- **Parameters**: `KEY` — your API key

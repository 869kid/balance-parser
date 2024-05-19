# Balance Config Parser

This project is a script for parsing data from Google Sheets and generating a JSON configuration linked to each country with correct start and end dates.

## Requirements

To run the script, you will need:

- Node.js and npm
- A Google account with access to Google Sheets API
- A file with Google API credentials
- A `.env` file to store sensitive information

## Installation

1. Install Node.js and npm if they are not already installed.

2. Clone the repository:

    ```bash
    git clone https://github.com/YOUR_USERNAME/balance-config-parser.git
    cd balance-config-parser
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory of the project and add your credentials:

    ```plaintext
    GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json
    SPREADSHEET_ID=your_spreadsheet_id
    ```

5. Create the `credentials.json` file by downloading it from the Google Cloud Console after setting up the Google Sheets API.

## Setting up Google Sheets API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to `APIs & Services > Library` and enable the Google Sheets API.
4. Navigate to `APIs & Services > Credentials` and create credentials of type `Service Account`.
5. Download the credentials file and save it in the root directory of the project as `credentials.json`.

## Usage

1. Run the script:

    ```bash
    node parse_balance.js
    ```

2. The JSON configuration will be generated and saved to the `balance_config.json` file.

## Example Configuration

An example of the generated JSON file:

```json
{
  "CIS_Balance": [
    {
      "start_date": "5/1/2024",
      "end_date": "5/5/2024",
      "balance": "Gacha_Base"
    },
    {
      "start_date": "5/4/2024",
      "end_date": "5/8/2024",
      "balance": "Gacha_Rare"
    }
  ],
  "EU_Balance": [
    {
      "start_date": "5/1/2024",
      "end_date": "5/4/2024",
      "balance": "RouletteBase"
    },
    {
      "start_date": "5/1/2024",
      "end_date": "5/5/2024",
      "balance": "Gacha_Base"
    },
    {
      "start_date": "5/3/2024",
      "end_date": "5/9/2024",
      "balance": "Gacha_Rare"
    }
  ],
  "UK_Balance": [
    {
      "start_date": "5/8/2024",
      "end_date": "5/9/2024",
      "balance": "RouletteEpic"
    },
    {
      "start_date": "5/9/2024",
      "end_date": "5/11/2024",
      "balance": "Gacha_Rare"
    },
    {
      "start_date": "5/11/2024",
      "end_date": "5/13/2024",
      "balance": "Gacha_Base"
    }
  ]
}


```markdown
# 🚀 Solana Telegram Automation Suite

![Solana](https://img.shields.io/badge/Solana-Web3.js-black?style=for-the-badge&logo=solana)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)
![Telegram](https://img.shields.io/badge/Telegram-Bot-blue?style=for-the-badge&logo=telegram)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 📌 Overview

**Solana Telegram Automation Suite** is a robust Node.js-based toolkit designed to bridge **Telegram** interfaces with the **Solana Blockchain**.

Developed as a reference architecture for the Solana Community, this project demonstrates how to programmatically manage wallets, sign transactions, and monitor on-chain events in real-time. It serves as a foundational framework for building Trading Bots, Sniping Tools, and DeFi Notification Systems.

## ✨ Key Features

### 1. 🤖 Interactive Trading Bot (`telegram-bot.js`)
-   **Wallet Management:** Securely import wallets using private keys (via environment variables).
-   **On-Chain Command:** Execute transactions (e.g., Send SOL) directly via Telegram commands like `/buy`.
-   **Explorer Integration:** Automatically generates Solscan links for every successful transaction.

### 2. 🕵️‍♂️ Real-Time Sniper Monitor (`sniper-bot.js`)
-   **WebSocket Listening:** Utilizes `connection.onLogs` to listen to the Solana Mainnet in real-time.
-   **New Pool Detection:** Instantly detects new Liquidity Pool creations on **Raydium** and **Pump.fun**.
-   **Helius RPC Integration:** Optimized for high-throughput data streaming using WSS (Secure WebSocket).

## 🛠️ Tech Stack

-   **Runtime:** Node.js
-   **Blockchain SDK:** `@solana/web3.js`, `@solana/spl-token`
-   **Bot Framework:** `node-telegram-bot-api`
-   **Cryptography:** `bs58` (Base58 decoding)
-   **Infrastructure:** Helius RPC (Recommended for WebSocket stability)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Transmetal/Solana-Tele-Testnet.git
cd Solana-Tele-Testnet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Security Configuration (Important)
Create a `.env` file in the root directory to store your sensitive credentials. **Never hardcode your keys.**

```env
# Your Telegram Bot Token from @BotFather
TELEGRAM_TOKEN=your_telegram_bot_token_here

# Your Solana Wallet Private Key (Base58 string from Phantom)
PRIVATE_KEY_STRING=your_private_key_here

# Your Helius RPC URL (for Mainnet Monitoring)
HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=your_api_key
```

## 📖 Usage Guide

### Mode A: Transaction Bot (Devnet Interaction)
Run this script to interact with the bot via Telegram. Use commands like `/start` and `/buy` to simulate transactions on the Devnet.
```bash
node telegram-bot.js
```

### Mode B: Sniper Monitor (Mainnet Spy)
Run this script to monitor the Solana Mainnet for new token launches on Raydium. The terminal will display live data feeds, and the bot will alert you on Telegram when a new pool is detected.
```bash
node sniper-bot.js
```

## 📂 Project Structure

```text
Solana-Tele-Testnet/
├── node_modules/       # Dependencies
├── .env                # Environment variables (Do not commit this!)
├── .gitignore          # Git ignore rules
├── index.js            # Basic script for testing transfers
├── racing.js           # Script for high-frequency transaction testing
├── telegram-bot.js     # The main interactive bot logic
├── sniper-bot.js       # The real-time monitoring logic
├── package.json        # Project metadata
└── README.md           # Documentation
```

## ⚠️ Disclaimer

This project is intended for **Educational and Research Purposes** only.

-   **Risk Warning:** Cryptocurrency trading involves significant risk.
-   **Security:** Always use **Devnet** for testing. Never share your `.env` file or Private Keys.
-   **Liability:** The author is not responsible for any financial losses incurred while using this code on Mainnet.

---

<p align="center">
  Built with ☕ by <b>Transmetal</b> | Solana Community Vice Chair
</p>
```

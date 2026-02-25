const TelegramBot = require('node-telegram-bot-api');
const { Connection, PublicKey } = require("@solana/web3.js");

// ==================================================================
// 🛠️ KONFIGURASI
// ==================================================================

// 1. Token Telegram (Pastikan tidak ada spasi di awal/akhir)
const TELEGRAM_TOKEN = 'USE_YOUR_TELE_TOKEN_HERE'; 

// 2. Link Helius RPC (Pastikan formatnya https://mainnet.helius-rpc.com/...)
const HELIUS_RPC_URL = 'USE_YOUR_RPC_URL_HERE';


// ==================================================================

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
let USER_CHAT_ID = null;

// Setup Koneksi (Ganti https ke wss)
const connection = new Connection(HELIUS_RPC_URL, {
    wsEndpoint: HELIUS_RPC_URL.replace('https', 'wss'), 
    commitment: "confirmed"
});

// ALAMAT RAYDIUM AMM V4 (Ini yang 100% Valid)
const RAYDIUM_PROGRAM_ID = new PublicKey('USE_YOUR_PUB_KEY');

console.clear();
console.log("================================================");
console.log("🕵️‍♂️  SOLANA SPY BOT: RAYDIUM (FIXED)");
console.log("================================================");
console.log("Menunggu perintah /start di Telegram...");

// --- LOGIKA TELEGRAM ---
bot.onText(/\/start/, (msg) => {
    USER_CHAT_ID = msg.chat.id;
    bot.sendMessage(USER_CHAT_ID, 
        `✅ **Spy Mode ON!**\n\nTarget: **Raydium**\nStatus: _Monitoring..._`, 
        {parse_mode: 'Markdown'}
    );
    startSniping();
});

// --- LOGIKA MATA-MATA ---
function startSniping() {
    console.log("\n📡 Sedang memantau Raydium...");

    connection.onLogs(
        RAYDIUM_PROGRAM_ID,
        ({ logs, err, signature }) => {
            if (err) return;

            // Debug: Titik biar tau bot hidup
            process.stdout.write("."); 

            // FILTER: Cari Token Baru ("initialize2")
            const isNewPool = logs.some(log => log.includes("initialize2"));

            if (isNewPool && USER_CHAT_ID) {
                console.log(`\n🔥 TOKEN BARU! ${signature}`);
                
                const pesan = `**RAYDIUM NEW POOL!**\n\n` +
                              `\`${signature}\`\n` +
                              `[Check Solscan](https://solscan.io/tx/${signature})`;

                bot.sendMessage(USER_CHAT_ID, pesan, {
                    parse_mode: 'Markdown',
                    disable_web_page_preview: true
                });
            }
        },
        "confirmed"
    );
}

// Handle Error Biar Gak Crash
bot.on('polling_error', (error) => {
    if (error.code !== 'ECONNRESET') console.log(`[TG Error] ${error.code}`);
});
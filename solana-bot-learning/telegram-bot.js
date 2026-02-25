const TelegramBot = require('node-telegram-bot-api');
const { 
    Connection, 
    Transaction, 
    SystemProgram, 
    Keypair, 
    sendAndConfirmTransaction, 
    LAMPORTS_PER_SOL 
} = require("@solana/web3.js");
const bs58 = require("bs58");

// --- ISI BAGIAN INI ---
// 1. Masukkan Token dari BotFather (Contoh: '7128...:AAH...')
const TELEGRAM_TOKEN = 'USE_YOUR_TELE_TOKEN_HERE';

// 2. Masukkan Private Key Phantom (Contoh: '5MHr...xyz')
const PRIVATE_KEY_STRING = 'USE_YOUR_WALLET__ADDRESS_HERE';


// --- SETUP SISTEM ---
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const secret = bs58.decode(PRIVATE_KEY_STRING);
const myWallet = Keypair.fromSecretKey(secret);

// Setup Telegram (Polling = Bot selalu ngecek chat baru)
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

console.log("Telegram Bot sedang berjalan...");
console.log(`Wallet Terhubung: ${myWallet.publicKey.toBase58()}`);

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Hello!\n\nI am your Solana Sniper Bot.\nType /buy to test the transaction!`);
});
bot.onText(/\/buy/, async (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, "🚀 Ready to Launch! Processing transactions on the Blockchain...");
    
    try {
        const receiver = Keypair.generate().publicKey;
        
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: myWallet.publicKey,
                toPubkey: receiver,
                lamports: 0.001 * LAMPORTS_PER_SOL, // 0.001 SOL
            })
        );

        const signature = await sendAndConfirmTransaction(
            connection, 
            transaction, 
            [myWallet]
        );

        // --- LAPORAN KE TELEGRAM ---
        const pesanSukses = `✅ **TRANSACTION SUCCESSFUL!**\n\n` +
                            `🔗 Hash: \`${signature.slice(0, 15)}...\`\n` +
                            `[CHECK YOUR TRANSACTION VIA SOLSCAN](https://solscan.io/tx/${signature}?cluster=devnet)`;
                            
        bot.sendMessage(chatId, pesanSukses, {parse_mode: 'Markdown', disable_web_page_preview: true});
        
    } catch (error) {
        bot.sendMessage(chatId, `❌ Gagal: ${error.message}`);
    }
});
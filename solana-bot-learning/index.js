const { 
    Connection, 
    Transaction, 
    SystemProgram, 
    Keypair, 
    sendAndConfirmTransaction, 
    LAMPORTS_PER_SOL 
} = require("@solana/web3.js");
const bs58 = require("bs58");

// 1. KONEKSI KE DEVNET (Jaringan Uang Mainan)
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// 2. SETUP DOMPET (BOT)
// ⚠️ GANTI TEKS DI BAWAH DENGAN PRIVATE KEY PHANTOM KAMU!
// Contoh: const PRIVATE_KEY_STRING = "5MHr...xyz";
const PRIVATE_KEY_STRING = "YOUR_PRIVATE_KEY"; 

async function main() {
    try {
        // Menerjemahkan Private Key agar bisa dipakai bot
        const secret = bs58.decode(PRIVATE_KEY_STRING);
        const myWallet = Keypair.fromSecretKey(secret);

        console.log(`🤖 Bot siap! Menggunakan wallet: ${myWallet.publicKey.toBase58()}`);

        // Cek saldo dulu
        const balance = await connection.getBalance(myWallet.publicKey);
        console.log(`Saldo Saat Ini: ${balance / LAMPORTS_PER_SOL} SOL`);

        if (balance < 0.01 * LAMPORTS_PER_SOL) {
            console.log("Saldo kurang! Minta faucet dulu.");
            return;
        }

        console.log("Sedang menyiapkan transaksi spamming...");

        // 3. MEMBUAT TRANSAKSI TRANSFER
        // Kita kirim 0.001 SOL ke alamat random (anggap saja biaya belajar)
        const randomReceiver = Keypair.generate().publicKey;

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: myWallet.publicKey,
                toPubkey: randomReceiver,
                lamports: 0.001 * LAMPORTS_PER_SOL, 
            })
        );

        // 4. KIRIM DAN TANDA TANGAN OTOMATIS
        // Bot akan menandatangani transaksi ini menggantikan jarimu
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [myWallet] 
        );

        console.log("✅ TRANSFER SUKSES!");
        console.log(`🔥 0.001 SOL terkirim ke: ${randomReceiver.toBase58()}`);
        console.log(`🔗 Cek Bukti Blockchain: https://solscan.io/tx/${signature}?cluster=devnet`);
        
    } catch (error) {
        console.error("❌ Gagal:", error);
        console.log("\nTIP: Pastikan Private Key benar dan saldo Devnet terisi.");
    }
}

main();
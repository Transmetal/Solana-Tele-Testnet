const { 
    Connection, 
    Transaction, 
    SystemProgram, 
    Keypair, 
    sendAndConfirmTransaction, 
    LAMPORTS_PER_SOL 
} = require("@solana/web3.js");
const bs58 = require("bs58");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// GANTI DENGAN PRIVATE KEY KAMU YANG TADI
const PRIVATE_KEY_STRING = "46dSGNko5USJNp65aGgW6o9buk1UGEMmgxGJAGqK8v3EoTPxouE6W5negqgWi3oRxH8UFZHoJjDYn6JaEex9Mh8m"; 

const secret = bs58.decode(PRIVATE_KEY_STRING);
const myWallet = Keypair.fromSecretKey(secret);

async function spamTransaction(index) {
    // Setiap transaksi kirim ke alamat beda biar tidak dianggap duplikat
    const receiver = Keypair.generate().publicKey;
    
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: myWallet.publicKey,
            toPubkey: receiver,
            lamports: 0.001 * LAMPORTS_PER_SOL,
        })
    );

    const signature = await sendAndConfirmTransaction(
        connection, 
        transaction, 
        [myWallet]
    );
    
    return `[Tx ${index}] Sukses ke: ${receiver.toBase58().slice(0,5)}... | Hash: ${signature.slice(0,10)}...`;
}

async function main() {
    console.log(`🏎️  START ENGINE: ${myWallet.publicKey.toBase58()}`);
    console.log("🔥 MENEMBAKKAN 5 TRANSAKSI SEKALIGUS...");

    const startTime = Date.now();

    // ARRAY OF PROMISES (Teknik Paralel)
    // Kita siapkan 5 perintah, tapi belum dijalankan
    const tasks = [
        spamTransaction(1),
        spamTransaction(2),
        spamTransaction(3),
        spamTransaction(4),
        spamTransaction(5)
    ];

    try {
        // JALANKAN SEMUA BERSAMAAN!
        const results = await Promise.all(tasks);
        
        const endTime = Date.now();
        console.log("\n✅ SEMUA TRANSAKSI SELESAI!");
        
        // Tampilkan Laporan
        results.forEach(res => console.log(res));

        console.log(`\n⏱️ Total Waktu: ${(endTime - startTime) / 1000} detik`);
        console.log("Ini adalah simulasi 'High-Performance Racing' sederhana.");

    } catch (error) {
        console.error("❌ Ada yang gagal (Wajar di mode balapan):", error);
    }
}

main();
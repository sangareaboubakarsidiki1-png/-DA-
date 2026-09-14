// EDA STEALTH DRONE - Gardien -DA-
// Drone TRON prêt pour Render
const TronWeb = require('tronweb');

const FULL_NODE = 'https://api.trongrid.io';
const tronWeb = new TronWeb.TronWeb({ fullHost: FULL_NODE });

console.log(">>> ÉDA STEALTH activé...");
console.log(">>> Gardien : -DA- | Mode : Ghost");

async function scan() {
  try {
    const price = await tronWeb.trx.getCurrentBlock();
    console.log(`[EDA] Block: ${price.block_header.raw_data.number} | Scan OK`);
    console.log(`[EDA] En attente de signal...`);
  } catch (e) {
    console.log("[EDA] Erreur scan, retry...", e.message);
  }
}

// Scan toutes les 30 sec
setInterval(scan, 30000);
scan();

// Garde le process actif pour Render
setInterval(()=>{}, 1000);

// utils/blockchain.jsx

export function logToBlockchain(eventType, details) {
  // Simulating blockchain storage
  const block = {
    eventType,
    details,
    timestamp: new Date().toISOString(),
    blockHash: Math.random().toString(36).substring(2, 15)
  };

  console.log("🟦 Blockchain Event Stored:", block);
  return block;
}

export function verifyBlockchainHash(hash) {
  // Dummy function for verification
  return hash && hash.length > 5;
}

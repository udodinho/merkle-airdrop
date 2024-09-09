import * as fs from "fs";
import csv from "csv-parser";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import * as dotenv from "dotenv";
dotenv.config();

// Define the interface for the CSV row
interface CsvRow {
    address: string;
    amount: string;
}

async function generateMerkleTree(filePath: string): Promise<void> {
    const entries: Buffer[] = [];

    // Read the CSV file
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row: CsvRow) => {
            const { address, amount } = row;
            const leaf = keccak256(Buffer.from(`${address},${amount}`)); // Hash the address and amount
            entries.push(leaf);
        })
        .on("end", () => {
            // Generate the Merkle tree and root
            const merkleTree = new MerkleTree(entries, keccak256, { sortPairs: true });
            const merkleRoot = merkleTree.getHexRoot();

            console.log("Merkle Root:", merkleRoot);

            // Optionally, output the tree and leaves for verification
            console.log("Merkle Tree:", merkleTree.toString());
        });
}

// Run the script with the provided CSV file path
const filePath = process.env.CSV_FILE_PATH
if (!filePath) {
    console.error("Please provide a CSV file path as an argument.");
    process.exit(1);
}

generateMerkleTree(filePath).catch(error => console.error("Error:", error));

// MerkleRoot: 0x59fc83c59d4d39f49bcb54ec885426220252dbdb4e658d987c25f1b1bfd4e70d
#!/usr/bin/env node
/*
 * Standalone decryptor for Local Backup ".zip.enc" archives.
 *
 * Depends only on Node's built-in crypto/fs — no plugin, no npm packages.
 * It reverses the documented container format:
 *
 *   magic  : 6 bytes  ASCII "LBENC1"
 *   version: 1 byte   0x01
 *   salt   : 16 bytes scrypt salt
 *   iv      : 12 bytes AES-GCM nonce
 *   tag     : 16 bytes AES-GCM auth tag
 *   data    : N bytes  AES-256-GCM ciphertext of the ZIP
 *
 * Key derivation: scrypt(password, salt, 32, { N: 16384, r: 8, p: 1 }).
 *
 * Usage:
 *   LB_PASSWORD=yourpass node scripts/decrypt.mjs input.zip.enc [output.zip]
 *   node scripts/decrypt.mjs input.zip.enc          # prompts for password
 *
 * The resulting .zip opens with any normal archive tool.
 */
import { createDecipheriv, scryptSync } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import readline from 'node:readline';

const MAGIC = Buffer.from('LBENC1', 'ascii');
const VERSION = 1;
const SALT_LEN = 16;
const IV_LEN = 12;
const TAG_LEN = 16;

function askPassword() {
	if (process.env.LB_PASSWORD) return Promise.resolve(process.env.LB_PASSWORD);
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	return new Promise((resolve) => {
		rl.question('Password: ', (answer) => {
			rl.close();
			resolve(answer);
		});
	});
}

function decrypt(container, password) {
	if (container.length < MAGIC.length + 1 + SALT_LEN + IV_LEN + TAG_LEN) {
		throw new Error('File too small to be a Local Backup encrypted archive.');
	}
	if (!container.subarray(0, MAGIC.length).equals(MAGIC)) {
		throw new Error('Not a Local Backup encrypted archive (bad magic).');
	}
	let o = MAGIC.length;
	const version = container[o];
	o += 1;
	if (version !== VERSION) throw new Error(`Unsupported version: ${version}`);
	const salt = container.subarray(o, (o += SALT_LEN));
	const iv = container.subarray(o, (o += IV_LEN));
	const tag = container.subarray(o, (o += TAG_LEN));
	const data = container.subarray(o);

	const key = scryptSync(password, salt, 32, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
	const decipher = createDecipheriv('aes-256-gcm', key, iv);
	decipher.setAuthTag(tag);
	try {
		return Buffer.concat([decipher.update(data), decipher.final()]);
	} catch {
		throw new Error('Decryption failed — wrong password or corrupted file.');
	}
}

async function main() {
	const input = process.argv[2];
	if (!input) {
		console.error('Usage: node scripts/decrypt.mjs <input.zip.enc> [output.zip]');
		process.exit(2);
	}
	const output = process.argv[3] ?? (input.replace(/\.enc$/i, '') || `${input}.zip`);
	const password = await askPassword();
	const container = readFileSync(input);
	const zip = decrypt(container, password);
	writeFileSync(output, zip);
	console.log(`Decrypted -> ${output} (${zip.length} bytes). Open it with any unzip tool.`);
}

main().catch((err) => {
	console.error(err.message ?? err);
	process.exit(1);
});

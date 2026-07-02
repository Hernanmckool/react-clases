import { readFileSync } from "node:fs";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = JSON.parse(
    readFileSync(new URL("../public/data/products.json", import.meta.url))
);

for (const product of products) {
    const { id, ...productData } = product;
    await setDoc(doc(db, "products", String(id)), productData);
    console.log(`Migrated product ${id}: ${product.name}`);
}

console.log(`Done. ${products.length} products migrated.`);
process.exit(0);

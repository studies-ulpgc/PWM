const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));
const jsonDir = path.join(__dirname, '../app/src/assets/json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function normalizeItems(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && typeof raw === 'object') return [raw];
  return [];
}

async function uploadFile(filePath) {
  const fileName = path.basename(filePath, '.json');
  const raw = require(filePath);
  const items = normalizeItems(raw);

  if (items.length === 0) {
    console.log(`Saltando ${fileName}: no hay datos válidos.`);
    return;
  }

  console.log(`Subiendo ${items.length} documentos a la colección ${fileName}...`);

  let batch = db.batch();
  let count = 0;

  for (const item of items) {
    const id = item?.id ? String(item.id) : db.collection(fileName).doc().id;
    const docRef = db.collection(fileName).doc(id);
    batch.set(docRef, item);
    count += 1;

    if (count === 400) {
      await batch.commit();
      batch = db.batch();
      count = 0;
    }
  }

  if (count > 0) await batch.commit();
  console.log(`Colección ${fileName} subida correctamente.`);
}

async function main() {
  const files = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));

  if (files.length === 0) {
    console.error('No se han encontrado archivos JSON en', jsonDir);
    process.exit(1);
  }

  for (const file of files) {
    await uploadFile(path.join(jsonDir, file));
  }

  console.log('¡Todos los JSON subidos a Firestore!');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
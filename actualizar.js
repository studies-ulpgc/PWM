const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const CLOUDINARY_BASE = "https://res.cloudinary.com/dxndjdzaq/image/upload/v1777503241/";

const colecciones = [
  'categorias', 'comentario', 'idiomas', 'imagen_izq', 
  'informacion', 'internacional', 'lista-pedidos-realizados', 
  'producto', 'usuarios'
];

function reemplazarUrls(obj) {
  let huboCambios = false;

  function buscar(nodo) {
    if (nodo !== null && typeof nodo === 'object') {
      for (let key in nodo) {
        if (key === 'url' && typeof nodo[key] === 'string') {
          
          let urlActual = nodo[key];

          if (urlActual.startsWith('/uploads/') || urlActual.includes('res.cloudinary.com')) {
            
            let nombreArchivo = urlActual.split('/').pop();

            nombreArchivo = nombreArchivo.replace(/^(large_|medium_|thumbnail_)/, '');

            const nuevaUrl = CLOUDINARY_BASE + nombreArchivo;

            if (urlActual !== nuevaUrl) {
              nodo[key] = nuevaUrl;
              huboCambios = true;
            }
          }
        } else {
          buscar(nodo[key]);
        }
      }
    }
  }

  buscar(obj);
  return huboCambios;
}

async function actualizarTodo() {
  console.log("🚀 Iniciando limpieza masiva de URLs...\n");

  for (const nombreCol of colecciones) {
    console.log(`📂 Revisando colección: ${nombreCol}...`);
    const snapshot = await db.collection(nombreCol).get();

    if (snapshot.empty) {
      console.log(`   (Colección vacía)`);
      continue;
    }

    let actualizados = 0;

    for (const doc of snapshot.docs) {
      let data = doc.data();

      const necesitaActualizar = reemplazarUrls(data);

      if (necesitaActualizar) {
        await db.collection(nombreCol).doc(doc.id).set(data);
        actualizados++;
      }
    }

    console.log(`   ✅ Se arreglaron las URLs en ${actualizados} documentos de '${nombreCol}'.`);
  }

  console.log("\n✨ ¡Proceso finalizado! Revisa tu Firebase para confirmar los cambios.");
}

actualizarTodo().catch(console.error);
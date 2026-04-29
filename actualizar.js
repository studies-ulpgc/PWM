const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json"); // Asegúrate de que este archivo se llame así

// Inicializa Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Tu base de Cloudinary con máxima calidad
const CLOUDINARY_BASE = "https://res.cloudinary.com/dxndjdzaq/image/upload/f_auto,q_auto:best/PWM/";

// Lista de todas tus colecciones de Firebase
const colecciones = [
  'categorias', 'comentario', 'idiomas', 'imagen_izq', 
  'informacion', 'internacional', 'lista-pedidos-realizados', 
  'producto', 'usuarios'
];

// Función "rastreadora" que busca recursivamente en todo el documento
function reemplazarUrls(obj) {
  let huboCambios = false;

  function buscar(nodo) {
    if (nodo !== null && typeof nodo === 'object') {
      for (let key in nodo) {
        // Si encontramos un campo "url" que empieza por "/uploads/"
        if (key === 'url' && typeof nodo[key] === 'string' && nodo[key].startsWith('/uploads/')) {
          const nombreArchivo = nodo[key].split('/').pop();
          nodo[key] = CLOUDINARY_BASE + nombreArchivo;
          huboCambios = true;
        } else {
          // Si es un objeto o array anidado (como Valoracion), entra y sigue buscando
          buscar(nodo[key]);
        }
      }
    }
  }

  buscar(obj);
  return huboCambios;
}

async function actualizarTodo() {
  console.log("🚀 Iniciando actualización masiva para todas las colecciones...\n");

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

      // Pasamos el documento entero por el rastreador de URLs
      const necesitaActualizar = reemplazarUrls(data);

      if (necesitaActualizar) {
        // Guardamos el documento entero de vuelta en Firebase con las nuevas URLs
        await db.collection(nombreCol).doc(doc.id).set(data);
        actualizados++;
      }
    }

    console.log(`   ✅ Se actualizaron las imágenes en ${actualizados} documentos de '${nombreCol}'.`);
  }

  console.log("\n✨ ¡Proceso finalizado con éxito! Todas tus imágenes ahora apuntan a Cloudinary.");
}

actualizarTodo().catch(console.error);
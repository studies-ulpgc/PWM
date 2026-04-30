const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

// Inicializa Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Tu nueva base de Cloudinary (Con la versión y sin carpetas extra)
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
        // Buscamos campos 'url' que sean strings
        if (key === 'url' && typeof nodo[key] === 'string') {
          
          let urlActual = nodo[key];

          // Filtramos: Solo tocamos si empieza por /uploads/ o si ya es de cloudinary pero está mal formateada
          if (urlActual.startsWith('/uploads/') || urlActual.includes('res.cloudinary.com')) {
            
            // 1. Sacamos solo el nombre del archivo final (ej: large_USA_3bad97994e.png)
            let nombreArchivo = urlActual.split('/').pop();

            // 2. Le quitamos los prefijos de tamaño si los tiene
            nombreArchivo = nombreArchivo.replace(/^(large_|medium_|thumbnail_)/, '');

            // 3. Construimos la URL perfecta
            const nuevaUrl = CLOUDINARY_BASE + nombreArchivo;

            // 4. Si la URL cambió, actualizamos
            if (urlActual !== nuevaUrl) {
              nodo[key] = nuevaUrl;
              huboCambios = true;
            }
          }
        } else {
          // Si es un objeto o array anidado, entra y sigue buscando
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

      // Pasamos el documento entero por el limpiador de URLs
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
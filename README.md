# SPRINT 4

## Introducción
El proyecto, titulado **“Tienda de Ropa Online”**, ha sido desarrollado por el **grupo 42, subgrupo 6**, formado por:

- Houyame Liazidi Daoudi  
- Dácil Santana Ortega  
- Alicia María Rodríguez Trujillo  

El objetivo del software es desarrollar una plataforma web de comercio electrónico destinada a la venta de ropa online, permitiendo a los usuarios navegar por productos, gestionar su cuenta y realizar compras.

## Ejecución programa
```bash
# Situarse en el directorio donde se encuentra el proyecto Angular
cd app

# Instalación de las dependencias
npm install -g @ionic/cli  
ionic init 

# En caso de fallar la instalación, añadir el argumento --legacy-peer-deps
npm install @capacitor/core @capacitor/cli --legacy-peer-deps 
npm install @angular-devkit/core @angular-devkit/schematics --save-dev --legacy-peer-deps
npm install @ionic/angular --legacy-peer-deps

# Para abrir el capacitor
npx cap init 

# Cargar la aplicación
ionic serve

# En caso de querer acceder a npx cap init debería de entrar en un navegador con una dirección similar a:
https://dashboard.ionicframework.com/org/aaf5aef7-dec4-4c8e-ade8-affbdc9b8d6f/apps
```
## Errores encontrados
```bash
# Instalamos versiones específicas compatibles (Firebase 11 es la actual para Angular 20)
npm cache clean --force   
Remove-Item -Recurse -Force node_modules/@angular/fire        
Remove-Item -Recurse -Force node_modules/firebase   
npm install firebase @angular/fire --save --legacy-peer-deps 
```


## Estructuración del proyecto

<pre>
<a href="./">PWM/</a>
├── <a href="./app/">app/</a>                         # Aplicación Angular
│   └── <a href="./app/src">src/</a>
│       ├── <a href="./app/src/app/">app/</a> 
│       │   ├── <a href="./app/src/app/components/">components/</a>      # Componentes reutilizables
│       │   ├── <a href="./app/src/app/pages/">pages/</a>           # Vistas principales
│       │   └── <a href="./app/src/app/services/">services/</a>        # Lógica de API
│       └── <a href="./app/src/environments/">environments/</a>        # Claves de la base de datos de Firestore
├── <a href="./backend/">backend/</a>                     # Código de subida de todo el contenido en json previo
├── <a href="./documentacion/">documentacion/</a>               # README de los anteriores Sprints
└── <a href="./Mockups/">Mockups/</a>                     # PDFs de los diseños de los Mockups
</pre>


## Listado de páginas y componentes

| **Páginas html** | **Componentes que utiliza** |
| --------------- | ------------------------- | 
| **[articulo-selecccionado](/app/src/app/pages/articulo-seleccionado)** | [header-grande](/app/src/app/components/header-grande) <br> [comentario](/app/src/app/components/comentario) <br> [similares](/app/src/app/components/similares) <br> [footer](/app/src/app/components/footer) |
| **[configurar-direccion-entrega](/app/src/app/pages/configurar-direccion-entrega)** | [img-izq](/app/src/app/components/img-izq/) |
| **[formulario-de-contacto](/app/src/app/pages/formulario-de-contacto)** | [img-izq](/app/src/app/components/img-izq/) |
| **[galeria](/app/src/app/pages/galeria)** | [header-grande](/app/src/app/components/header-grande) <br> [similares](/app/src/app/components/similares) <br> [footer](/app/src/app/components/footer) |
| **[home](/app/src/app/pages/home) (pagina de inicio)** | [header-grande](/app/src/app/components/header-grande) <br> [similares](/app/src/app/components/similares) <br> [footer](/app/src/app/components/footer) |
| **[informacion](/app/src/app/pages/informacion)** | [header-grande](/app/src/app/components/header-grande) <br> [footer](/app/src/app/components/footer) |
| **[iniciar-sesion](/app/src/app/pages/iniciar-sesion)** | [img-izq](/app/src/app/components/img-izq/)  |
| **[lista-deseados](/app/src/app/pages/lista-deseados)** | [header-grande](/app/src/app/components/header-grande) <br> [item-wanted](/app/src/app/components/item-wanted/) <br> [similares](/app/src/app/components/similares) <br> [footer](/app/src/app/components/footer) |
| **[lista-pedidos-realizados](/app/src/app/pages/lista-pedidos-realizados)** | [header-grande](/app/src/app/components/header-grande) <br> [item-comprado](/app/src/app/components/item-comprado/) <br> [similares](/app/src/app/components/similares) <br> [footer](/app/src/app/components/footer) |
| **[pagar](/app/src/app/pages/pagar)** | [header-grande](/app/src/app/components/header-grande) <br> [footer](/app/src/app/components/footer) |
| **[registrarse](/app/src/app/pages/registrarse)** | [img-izq](/app/src/app/components/img-izq/) |
| **[ver-cesta](/app/src/app/pages/ver-cesta)** | [header-grande](/app/src/app/components/header-grande) <br> [item-card](/app/src/app/components/item-card/) <br> [similares](/app/src/app/components/similares) <br> [footer](/app/src/app/components/footer) |
| **[ver-cuenta](/app/src/app/pages/ver-cuenta)** | [header-grande](/app/src/app/components/header-grande) <br> [footer](/app/src/app/components/footer) |

| **Componente** | **Componente que usa** |
| ------------ | -------------------- | 
| **[header-grande](/app/src/app/components/header-grande)** | **Ninguno** |
| **[comentario](/app/src/app/components/comentario)** | **Ninguno** |
| **[producto](/app/src/app/components/producto)** | **Ninguno** |
| **[footer](/app/src/app/components/footer)** | **Ninguno** |
| **[similares](/app/src/app/components/similares)** | **[producto](/app/src/app/components/producto)** |
| **[img-izq](/app/src/app/components/img-izq/)** | **Ninguno** |
| **[item-card](/app/src/app/components/item-card/)** | **Ninguno** |
| **[item-comprado](/app/src/app/components/item-comprado/)** | **Ninguno** |
| **[item-wanted](/app/src/app/components/item-wanted/)** | **Ninguno** |

## Otros aspectos a tener en cuenta
Se han agregado funcionalidades como el slider de Galería que ahora filtra el precio, en Artículo seleccionado si se selecciona una prenda no se muestra en “Podría Interesarte” y en el inicio de sesión optamos por emplear sólo una web en vez de tres. Además, la página sigue siendo responsive.
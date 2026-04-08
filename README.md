# SPRINT 3

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
npm install
npm install @angular/fire@latest
npm install firebase-admin

# En caso de fallar la instalación, añadir el argumento --legacy-peer-deps
npm install --legacy-peer-deps
npm install @angular/fire@latest --legacy-peer-deps

# Cargar la aplicación
ng serve

# Si se quiere que se abra directamente emplear el argumento --open
ng serve --open
```
## Otros aspectos a tener en cuenta
...

## Listado de páginas html
Cada página con nombre del mockup que implementa:
| **Página html** | **Mockup que implementa** |
| --------------- | ------------------------- | 
| **[articulo-selecccionado.html](/app/src/app/pages/articulo-seleccionado/articulo-seleccionado.html)** | **Artículo Seleccionado** |
| **[configurar-direccion-entrega.html](/app/src/app/pages/configurar-direccion-entrega/configurar-direccion-entrega.html)** | **Configurar dirección de entrega** |
| **[formulario-de-contacto.html](/app/src/app/pages/formulario-de-contacto/formulario-de-contacto.html)** | **Formulario de contacto** |
| **[galeria.html](/app/src/app/pages/galeria/galeria.html)** | **Galería** |
| **[home.html](/app/src/app/pages/home/home.html) (pagina de inicio)** | **Home** |
| **[informacion.html](/app/src/app/pages/informacion/informacion.html)** | **Información** |
| **[iniciar-sesion.html](/app/src/app/pages/iniciar-sesion/iniciar-sesion.html)** | **Iniciar Sesión** |
| **[lista-deseados.html](/app/src/app/pages/lista-deseados/lista-deseados.html)** | **Lista de deseados** |
| **[lista-pedidos-realizados.html](/app/src/app/pages/lista-pedidos-realizados/lista-pedidos-realizados.html)** | **Lista Pedidos realizados** |
| **[pagar.html](/app/src/app/pages/pagar/pagar.html)** | **Pagar** |
| **[registrarse.html](/app/src/app/pages/registrarse/registrarse.html)** | **Registrarse** |
| **[ver-cesta.html](/app/src/app/pages/ver-cesta/ver-cesta.html)** | **Ver cesta** |
| **[ver-cuenta.html](/app/src/app/pages/ver-cuenta/ver-cuenta.html)** | **Ver Cuenta** |

| **Template** | **Template que usa** |
| ------------ | -------------------- | 
| **[header-grande.html](/app/src/app/components/header-grande/header-grande.html)** | **Ninguno** |
| **[comentario.html](/app/src/app/components/comentario/comentario.html)** | **Ninguno** |
| **[producto.html](/app/src/app/components/producto/producto.html)** | **Ninguno** |
| **[footer.html](/app/src/app/components/footer/footer.html)** | **Ninguno** |
| **[similares.html](/app/src/app/components/similares/similares.html)** | **[producto.html](/app/src/app/components/producto/producto.html)** |

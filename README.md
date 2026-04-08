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

# En caso de fallar la instalación, añadir el argumento --legacy-peer-deps
npm install --legacy-peer-deps
npm install @angular/fire@latest --legacy-peer-deps

# Cargar la aplicación
ng serve
```

## Listado de páginas html
Cada página con nombre del mockup que implementa:
| **Página html** | **Mockup que implementa** |
| --------------- | ------------------------- | 
| **[articulo-selecccionado.html](../html/articulo-seleccionado.html)** | **Artículo Seleccionado** |
| **[configurar-direccion-entrega.html](../html/configurar-direccion-entrega.html)** | **Configurar dirección de entrega** |
| **[formulario-de-contacto.html](../html/formulario-de-contacto.html)** | **Formulario de contacto** |
| **[galeria.html](../html/galeria.html)** | **Galería** |
| **[home.html](../html/home.html) (pagina de inicio)** | **Home** |
| **[informacion.html](../html/informacion.html)** | **Información** |
| **[iniciar-sesion.html](../html/iniciar-sesion.html)** | **Iniciar Sesión** |
| **[lista-deseados.html](../html/lista-deseados.html)** | **Lista de deseados** |
| **[lista-pedidos-realizados.html](../html/lista-pedidos-realizados.html)** | **Lista Pedidos realizados** |
| **[pagar.html](../html/pagar.html)** | **Pagar** |
| **[registrarse.html](../html/registrarse.html)** | **Registrarse** |
| **[ver-cesta.html](../html/ver-cesta.html)** | **Ver cesta** |
| **[ver-cuenta.html](../html/ver-cuenta.html)** | **Ver Cuenta** |

| **Template** | **Template que usa** |
| ------------ | -------------------- | 
| **[header-grande.html](../html/header-grande.html)** | **Ninguno** |
| **[header-corto.html](../html/header-corto.html)** | **Ninguno** |
| **[producto.html](../html/producto.html)** | **Ninguno** |
| **[footer.html](../html/footer.html)** | **Ninguno** |
| **[similares.html](../html/similares.html)** | **[producto.html](../html/producto.html)** |

## Otros aspectos a tener en cuenta
...
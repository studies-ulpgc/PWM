# SPRINT 2

## Introducción
El proyecto, titulado **“Tienda de Ropa Online”**, ha sido desarrollado por el **grupo 42, subgrupo 6**, formado por:

- Houyame Liazidi Daoudi  
- Dácil Santana Ortega  
- Alicia María Rodríguez Trujillo  

El objetivo del software es desarrollar una plataforma web de comercio electrónico destinada a la venta de ropa online, permitiendo a los usuarios navegar por productos, gestionar su cuenta y realizar compras.

## Mockups (Figma)
A continuación se incluyen los mockups diseñados para los distintos dispositivos:

- **Formato ordenador:** [Mockups_ordenador.pdf](Mockups/Mockups_ordenador.pdf)  
- **Formato tablet:** [Mockups_tablet.pdf](Mockups/Mockups_tablet.pdf)  
- **Formato móvil:** [Mockups_movil.pdf](Mockups/Mockups_movil.pdf)  

Estos mockups representan la estructura visual y la experiencia de usuario prevista para la aplicación. Cabe destacar que los elementos con scroll horizontal se muestran extendidos fuera del recuadro, con el objetivo de indicar visualmente este comportamiento.

## Más información
La documentación detallada sobre los **requisitos**, **funcionalidades**, **templates** y su integración en HTML se encuentra en:

- [README_Sprint1.md](documentacion/README_Sprint1.md)

Este documento recoge el trabajo realizado en el Sprint 1 y sirve como base para este sprint.

## Otros aspectos a tener en cuenta
- Las imágenes del proyecto están organizadas en dos rutas:
  - [img/](img/): contiene las imágenes utilizadas directamente en HTML (iconos, tarjetas, etc.).
  - [uploads/](uploads/): contiene las imágenes empleadas en los datos del JSON.
- Los scripts están separados según su funcionalidad:
  - [carga-datos/](js/carga-datos/): Se encarga de la carga y gestión de los datos provenientes de archivos JSON.
  - [carga-dinamica/](js/carga-dinamica/): Gestiona la renderización dinámica de componentes/templates en el DOM.
- Este archivo contiene distintas páginas informativas estructuradas mediante componentes dinámicos:
  - info.bloque-texto → Párrafos de contenido.
  - info.tarjeta-informativa → Tarjetas con imagen y título.
  - info.seccion-destacada → Secciones destacadas con título, descripción e imagen.

- El proyecto incluye distintos sistemas de filtrado según la sección:
  - En la página de **pedidos realizados**, existe un mecanismo de filtrado que permite mostrar u ocultar los artículos según su estado de envío.
  - En la **galería** de productos, se implementa un sistema de filtrado mediante un desplegable de categorías, que permite visualizar los productos según su tipo (camisas o chaquetas).

## Listado de páginas html
Cada página con nombre del mockup que implementa:
| **Página html** | **Mockup que implementa** |
 | --------------- | ------------------------- | 
| **[articulo-selecccionado.html](html/articulo-seleccionado.html)** | **Artículo Seleccionado** |
| **[configurar-direccion-entrega.html](html/configurar-direccion-entrega.html)** | **Configurar dirección de entrega** |
| **[formulario-de-contacto.html](html/formulario-de-contacto.html)** | **Formulario de contacto** |
| **[galeria.html](html/galeria.html)** | **Galería** |
| **[home.html](html/home.html) (pagina de inicio)** | **Home** |
| **[informacion.html](html/informacion.html)** | **Información** |
| **[iniciar-sesion.html](html/iniciar-sesion.html)** | **Iniciar Sesión** |
| **[lista-deseados.html](html/lista-deseados.html)** | **Lista de deseados** |
| **[lista-pedidos-realizados.html](html/lista-pedidos-realizados.html)** | **Lista Pedidos realizados** |
| **[pagar.html](html/pagar.html)** | **Pagar** |
| **[registrarse.html](html/registrarse.html)** | **Registrarse** |
| **[ver-cesta.html](html/ver-cesta.html)** | **Ver cesta** |
| **[ver-cuenta.html](html/ver-cuenta.html)** | **Ver Cuenta** |

| **Template** | **Template que usa** |
 | ------------ | -------------------- | 
| **[header-grande.html](html/header-grande.html)** | **Ninguno** |
| **[header-corto.html](html/header-corto.html)** | **Ninguno** |
| **[producto.html](html/producto.html)** | **Ninguno** |
| **[footer.html](html/footer.html)** | **Ninguno** |
| **[similares.html](html/similares.html)** | **[producto.html](html/producto.html)** |
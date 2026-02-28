El nombre del proyecto es “Tienda de Ropa Online” y el grupo 42 subgrupo 6 que está formado por Houyame Liazidi Daoudi, Dácil Santana Ortega y Alicia María Rodríguez Trujillo.
El software consiste en una plataforma web de comercio electrónico destinada a la venta de ropa online.


REQUISITOS

Clases y características de usuarios
Para este producto software se diferencian dos tipos de usuarios:
- Los usuarios no registrados, los cuales podrán acceder a la parte pública del sistema. Por lo tanto, podrán visualizar el catálogo y ver la información detallada de los productos, realizar búsquedas y registrarse o iniciar sesión. La frecuencia de uso será ocasional y el nivel de acceso limitado.
- Los usuarios registrados, los cuales podrán acceder a la parte pública y privada del sistema. Por lo que, en adición, podrán gestionar la cuenta, la lista de deseos y la cesta de la compra, realizar compras, valorar productos, solicitar reembolsos y comunicarse con atención al cliente. La frecuencia de uso sería frecuente y el nivel de acceso completo.

Funcionalidades:
Nuestra web ofrece diferentes funcionalidades orientadas a facilitar la experiencia del usuario.
En primer lugar, cuenta con un sistema de gestión de usuarios que incluye el registro, la autenticación y el acceso a las áreas privadas.
Además, dispone de un catálogo de productos desde el que se pueden explorar y buscar artículos de forma sencilla. Los usuarios también pueden guardar sus productos favoritos en una lista de deseos para consultarlos más adelante.
Por otro lado, la plataforma incorpora una cesta de compra donde es posible añadir, eliminar o modificar características seleccionadas de los productos antes de finalizar el pedido.El proceso de compra es claro e intuitivo, y guía al usuario paso a paso hasta finalizar el pedido.
Finalmente, se incluyen funcionalidades de postventa y valoración de productos, así como un canal de comunicación directa con el servicio de atención al cliente para resolver dudas o incidencias.

Para ver los requisitos redactados de forma detallada, acceda al documento Requisitos.pdf que se encuentra en la raíz del directorio de trabajo.

Nombre y Ubicación del pdf con mockups y del vídeo de la navegabilidad:
Nombre del pdf con los mockups: Mockups.pdf. Se encuentra en el directorio de trabajo,
El vídeo con la navegabilidad se llama: NAVEGACION.mp4 y se encuentra en el directorio de trabajo.

Listado de páginas html:
Cada página con nombre del mockup que implementa (indicar página de inicio)
|-----------------------------------------------------------------|
|Página html                      |Mockup que implementa          |
|-----------------------------------------------------------------|
|articulo-selecccionado.html      |Artículo Seleccionado          |
|-----------------------------------------------------------------|
|configurar-direccion-entrega.html|Configurar dirección de entrega|
|-----------------------------------------------------------------|
|formulario-de-contacto.html      |Formulario de contacto         |
|-----------------------------------------------------------------|
|galeria.html                     |Galería                        |
|-----------------------------------------------------------------|
|home.html (pagina de inicio)     |Home                           |
|-----------------------------------------------------------------|
|informacion.html                 |Información                    |
|-----------------------------------------------------------------|
|iniciar-sesion.html              |Iniciar Sesión                 |
|-----------------------------------------------------------------|
|lista-deseados.html              |Lista de deseados              |
|-----------------------------------------------------------------|
|lista-pedidos-realizados.html    |Lista Pedidos realizados       |
|-----------------------------------------------------------------|
|pagar.html                       |Pagar                          |
|-----------------------------------------------------------------|
|registrarse.html                 |Registrarse                    |
|-----------------------------------------------------------------|
|ver-cesta.html                   |Ver cesta                      |
|-----------------------------------------------------------------|
|ver-cuenta.html                  |Ver Cuenta                     |
|-----------------------------------------------------------------|

Listado de archivos templates identificados:
Todos las páginas emplean el script main.js, excepto ver cesta que también implementa calculo-precio.js.

|---------------------------------------------------|
|Página html                      |Templates que usa|
|---------------------------------------------------|
|articulo-seleccionado.html       |header-corto.html|
|                                 |comentario.html  |
|                                 |producto.html    |
|                                 |footer.html      |
|---------------------------------------------------|
|configurar-direccion-entrega.html|Ninguno          |
|---------------------------------------------------|
|formulario-de-contacto.html      |Ninguno          |
|---------------------------------------------------|
|galeria.html                     |header-corto.html|
|                                 |producto.html    |
|                                 |footer.html      |
|---------------------------------------------------|
|home.html                        |header-corto.html|
|(pagina de inicio)               |producto.html    |
|                                 |footer.html      |
|---------------------------------------------------|
|informacion.html                 |header-corto.html|
|                                 |footer.html      |
|---------------------------------------------------|
|iniciar-sesion.html              |Ninguno          |
|---------------------------------------------------|
|lista-deseados.html              |header-corto.html|
|                                 |similares.html   |
|                                 |footer.html      |
|---------------------------------------------------|
|lista-pedidos-realizados.html    |header-corto.html|
|                                 |similares.html   |
|                                 |footer.html      |
|---------------------------------------------------|
|pagar.html                       |header-corto.html|
|                                 |footer.html      |
|---------------------------------------------------|
|registrarse.html                 |Ninguno          |
|---------------------------------------------------|
|ver-cesta.html                   |header-corto.html|
|                                 |similares.html   |
|                                 |footer.html      |
|---------------------------------------------------|
|ver-cuenta.html                  |header-corto.html|
|                                 |footer.html      |
|---------------------------------------------------|
|Template                         |Templates que usa|
|---------------------------------------------------|
|header-grande.html               |Ninguno          |
|---------------------------------------------------|
|header-corto.html                |Ninguno          |
|---------------------------------------------------|
|producto.html                    |Ninguno          |
|---------------------------------------------------|
|footer.html                      |Ninguno          |
|---------------------------------------------------|
|similares.html                   |producto.html    |
|---------------------------------------------------|

Otros aspectos a tener en cuenta

Se ha empleado javascript para que el header cambie en función de si se ha iniciado sesión o no. De forma que si no se ha iniciado sesión, al tratar de acceder a la lista de productos deseados o a la cesta, te lleve al inicio de sesión. Además, todos los símbolos o botones que sean presionables tienen un color más claro si el usuario no está registrado. Una vez iniciada sesión, el símbolo de la persona abre un desplegable que te permite acceder a tus pedidos y ver la cuenta, además de todas las opciones de la parte privada. A modo de resumen, hay navegación y cambios de color relacionadas con condicionales.
En adición, en la página web de ver-cesta.html, tiene la función en javascript que si se agrega o elimina del seleccionable elementos el precio total aumenta o disminuye acorde.
En cuanto a la interactividad, mediantes css se han realizado scrolls (verticales u horizontales), cambios de color o agregado de bordes en botones o íconos mientras el puntero esté encima, o cambio de tamaño cuando se activen. Mediante css se agregó una animación de un carrusel en el Home.
Cabe resaltar que para prevenir repetir los mismos fragmentos de código, hay funciones en común que se encargan de cargar componentes una o varias veces.
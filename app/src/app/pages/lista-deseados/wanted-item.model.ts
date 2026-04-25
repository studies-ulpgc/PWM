export interface WantedItem {
  id: number;
  name: string;
  opts: string;
  price: number;
  img: string;
  added: boolean; // Controla si el botón dice "Añadir" o "Añadido"
}
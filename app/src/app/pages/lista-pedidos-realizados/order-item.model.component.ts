export interface OrderItem {
  id: number;
  name: string;
  opts: string;
  price: number;
  img: string;
  status: 'En envío' | 'En ruta de entrega' | 'Entregado';
  selected: boolean;
}
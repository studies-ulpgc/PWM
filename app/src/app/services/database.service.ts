import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private db!: SQLiteDBConnection;
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

  async inicializarDB() {
    this.db = await this.sqlite.createConnection('had_db', false, 'no-encryption', 1, false);
    await this.db.open();
    
    const schema = `
      CREATE TABLE IF NOT EXISTS deseados (id TEXT PRIMARY KEY, nombre TEXT, precio REAL, img TEXT);
      CREATE TABLE IF NOT EXISTS cesta (id TEXT PRIMARY KEY, nombre TEXT, precio REAL, img TEXT, cantidad INTEGER);
    `;
    await this.db.execute(schema);
  }

  async addDeseado(prod: any) {
    const sql = `INSERT OR REPLACE INTO deseados (id, nombre, precio, img) VALUES (?, ?, ?, ?)`;
    const img = prod.fotoUrl || prod.img;
    const precio = prod.precio !== undefined ? prod.precio : parseFloat(`${prod.precioEntero || 0}.${prod.precioDecimal || '00'}`);
    
    await this.db.run(sql, [prod.id.toString(), prod.nombre, precio, img]);
  }

  async getDeseados() {
    const res = await this.db.query('SELECT * FROM deseados');
    return res.values || [];
  }
  
  async removeDeseado(id: string | number) {
      const sql = `DELETE FROM deseados WHERE id = ?`;
      await this.db.run(sql, [id]);
  }

  async removeCesta(id: string | number) {
      const sql = `DELETE FROM cesta WHERE id = ?`;
      await this.db.run(sql, [id]);
  }

  async addCesta(prod: any) {
    const sql = `INSERT OR REPLACE INTO cesta (id, nombre, precio, img, cantidad) VALUES (?, ?, ?, ?, ?)`;
    const img = prod.fotoUrl || prod.img;
    const precio = prod.precio !== undefined ? prod.precio : parseFloat(`${prod.precioEntero || 0}.${prod.precioDecimal || '00'}`);
    
    await this.db.run(sql, [prod.id.toString(), prod.nombre, precio, img, 1]);
  }

  async getCesta() {
    const res = await this.db.query('SELECT * FROM cesta');
    return res.values || [];
  }

  async exists(tabla: 'deseados' | 'cesta', id: string): Promise<boolean> {
    const res = await this.db.query(`SELECT id FROM ${tabla} WHERE id = ?`, [id]);
    return !!(res.values && res.values.length > 0);
  }
}

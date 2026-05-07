import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private db!: SQLiteDBConnection;
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

  async inicializarDB() {
    this.db = await this.sqlite.createConnection('had_db', false, 'no-encryption', 1, false);
    await this.db.open();
    
    // Crear tablas si no existen
    const schema = `
      CREATE TABLE IF NOT EXISTS deseados (id TEXT PRIMARY KEY, nombre TEXT, precio REAL, img TEXT);
      CREATE TABLE IF NOT EXISTS cesta (id TEXT PRIMARY KEY, nombre TEXT, precio REAL, img TEXT, cantidad INTEGER);
    `;
    await this.db.execute(schema);
  }

  // Guardar en deseados
  async addDeseado(prod: any) {
    const sql = `INSERT OR REPLACE INTO deseados (id, nombre, precio, img) VALUES (?, ?, ?, ?)`;
    await this.db.run(sql, [prod.id, prod.nombre, prod.precio, prod.fotoUrl]);
  }

  async getDeseados() {
    const res = await this.db.query('SELECT * FROM deseados');
    return res.values || [];
  }
  
    async removeDeseado(id: string | number) {
        const sql = `DELETE FROM deseados WHERE id = ?`;
        await this.db.run(sql, [id]);
    }

    // Borrar de la cesta por ID
    async removeCesta(id: string | number) {
        const sql = `DELETE FROM cesta WHERE id = ?`;
        await this.db.run(sql, [id]);
    }
}

# Backend Documentation

Lokasi: `backend/`

Dokumentasi ini berisi API reference, aturan khusus (mis. field shift), panduan kontribusi, dan changelog untuk server Node + SQL Server.

File penting di folder ini:
- `API.md` — Kontrak endpoint dan contoh request/response.
- `SHIFT.md` — Penjelasan tentang cara menyimpan dan memvalidasi field `shift` (nilai yang diizinkan: `pagi`, `siang`, `malam`).
- `CONTRIBUTING.md` — Proses kontribusi dan kewajiban memperbarui dokumentasi setiap perubahan.
- `CHANGELOG.md` — Riwayat perubahan.

Catatan singkat:
- Field `shift` disimpan sebagai string di database. Backend wajib memvalidasi nilainya sebelum menyimpan.
- SELALU update dokumentasi setiap ada perubahan API agar frontend mudah integrasi.

## Quick Start

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Setup SQL Server:**
   - Jalankan `backend/setup-sql-login.sql` di SSMS untuk membuat login `prisma_user`.
   - Jalankan `backend/grant-create-db.sql` untuk beri permission CREATE DATABASE (opsional, untuk migrate).
   - Aktifkan Mixed Authentication mode (SQL + Windows Auth):
     - SSMS > klik kanan server > Properties > Security > pilih "SQL Server and Windows Authentication mode"
     - Restart SQL Server service di services.msc
   - Pastikan SQL Server listen di port 1433 (bukan dynamic port):
     - SQL Server Configuration Manager > Protocols for SQLEXPRESS > TCP/IP > IPAll > TCP Port = 1433

3. **Konfigurasi `.env`:**
   ```properties
   db_auth=sql
   db_host=localhost
   db_name=db_restoran
   db_user=prisma_user
   db_password=Prisma!2025
   db_trust_server_certificate=true
   PORT=3000
   
   DATABASE_URL="sqlserver://localhost:1433;database=db_restoran;user=prisma_user;password=Prisma!2025;encrypt=true;trustServerCertificate=true"
   SHADOW_DATABASE_URL=""
   JWT_SECRET="kata_mamah_aku_sigma08953214371987"
   ```
   
   **PENTING:** JANGAN tambahkan `instanceName` ke sqlConfig karena konflik dengan port 1433.

4. **Sinkronkan database schema:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Test koneksi (opsional):**
   ```bash
   node test-db.js
   ```
   
   Expected: `✅ Connected to SQL Server`

6. **Jalankan server:**
   ```bash
   npm run dev
   ```
   Akses: http://localhost:3000/db/ping
   
   Expected response:
   ```json
   {
     "ok": true,
     "db": "db_restoran",
     "server": "NAMA-PC",
     "instance": null
   }
   ```
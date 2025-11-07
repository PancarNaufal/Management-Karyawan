# Changelog

All notable changes to this backend will be documented in this file.

## [Unreleased]
- TBD

## [0.2.0] - 2025-11-07
### Added
- **Role Management System:** Admin bisa buat, edit, dan hapus role custom.
- Field baru di model Role: `gajiPokok`, `deskripsi`, `createdAt`, `updatedAt`.
- Controller `roleController.js` dengan CRUD lengkap untuk role.
- Middleware `authMiddleware.js`:
  - `authenticateToken`: Verifikasi JWT token.
  - `isAdmin`: Cek apakah user adalah Admin.
- Routes `/roles` dengan proteksi admin-only untuk create, update, delete.
- Dokumentasi lengkap di `docs/API.md` untuk endpoint auth dan role management.
- Dokumentasi Postman di `docs/POSTMAN.md` dengan flow testing lengkap.

### Changed
- Model Role sekarang support gaji per role (gaji tidak lagi di model Gaji saja).
- Endpoint role management memerlukan authentication (Bearer token).
- Admin dapat create role dengan nama dan gaji custom.

### Security
- Semua endpoint role (kecuali GET) dilindungi middleware `isAdmin`.
- Token JWT expires dalam 1 jam.
- Password di-hash dengan bcrypt sebelum disimpan.

## [0.1.1] - 2025-11-07
### Fixed
- Fix SQL Server connection timeout issue: removed `instanceName` from sqlConfig (konflik dengan port 1433).
- Fix error handling di `/db/ping` endpoint (tampilkan error message dengan benar).
- Ubah dari Windows Authentication ke SQL Authentication (driver `mssql` tedious, bukan `mssql/msnodesqlv8`).

### Changed
- Prisma generator output kembali ke default `node_modules/@prisma/client` (bukan custom path).
- Update `.env` dengan semua variabel yang dibutuhkan termasuk JWT_SECRET.
- Update dokumentasi setup dengan troubleshooting common errors.

### Added
- Script `test-db.js` untuk debug koneksi database.
- NPM scripts: `dev`, `studio`, `db:push`, `db:migrate`, `db:generate`.

## [0.1.0] - 2025-11-07
### Added
- Initial documentation files: `API.md`, `SHIFT.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `README.md` in `backend/docs`.
- Setup script `setup-sql-login.sql` untuk membuat SQL login `prisma_user`.
- Script `enable-sql-auth.ps1` untuk mengaktifkan Mixed Authentication mode.
- Script `grant-create-db.sql` untuk beri permission CREATE DATABASE.
- Prisma schema dengan model: Role, User, Jadwal, Absensi, Gaji, LaporanPemasukan.

### Changed
- Field `shift` di model `LaporanPemasukan` menggunakan string (bukan enum) dengan validasi: "pagi", "siang", "malam".
- `.env` menggunakan SQL Authentication (bukan Windows Auth) untuk kompatibilitas Prisma.
- Shadow database disabled (`SHADOW_DATABASE_URL=""`) untuk dev lokal tanpa permission CREATE DATABASE.


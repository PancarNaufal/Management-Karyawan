## API Reference

Base URL: `http://localhost:3000`

Catatan: Tambahkan endpoint baru di dokumen ini setiap menambah route di `backend/index.js` atau file route lain.

---

## 🔐 Authentication

### POST /auth/register
Registrasi user baru.

**Request Body:**
```json
{
  "nama": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "roleId": 1
}
```

**Response 201 (Created):**
```json
{
  "message": "User berhasil terdaftar",
  "user": {
    "id": 1,
    "nama": "John Doe",
    "email": "john@example.com",
    "roleId": 1
  }
}
```

**Response 409 (Conflict):**
```json
{
  "message": "Email sudah terdaftar."
}
```

---

### POST /auth/login
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response 200 (OK):**
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response 401 (Unauthorized):**
```json
{
  "message": "Password salah."
}
```

**Response 404 (Not Found):**
```json
{
  "message": "Email tidak ditemukan."
}
```

---

## 👥 Role Management (Admin Only)

**Headers untuk semua endpoint di bawah:**
```
Authorization: Bearer <token>
```

### GET /roles
Get semua roles (semua user yang login bisa akses).

**Response 200:**
```json
{
  "message": "Daftar role berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Admin",
      "gajiPokok": 10000000,
      "deskripsi": "Administrator sistem",
      "createdAt": "2025-11-07T10:00:00Z",
      "updatedAt": "2025-11-07T10:00:00Z",
      "_count": {
        "users": 2
      }
    }
  ]
}
```

---

### GET /roles/:id
Get role by ID (semua user yang login bisa akses).

**Response 200:**
```json
{
  "message": "Role berhasil diambil",
  "data": {
    "id": 1,
    "nama": "Admin",
    "gajiPokok": 10000000,
    "deskripsi": "Administrator sistem",
    "users": [
      {
        "id": 1,
        "nama": "John Doe",
        "email": "john@example.com"
      }
    ]
  }
}
```

---

### POST /roles
Buat role baru (Admin only).

**Request Body:**
```json
{
  "nama": "Manager",
  "gajiPokok": 8000000,
  "deskripsi": "Manager operasional"
}
```

**Response 201:**
```json
{
  "message": "Role berhasil dibuat",
  "data": {
    "id": 4,
    "nama": "Manager",
    "gajiPokok": 8000000,
    "deskripsi": "Manager operasional",
    "createdAt": "2025-11-07T11:00:00Z",
    "updatedAt": "2025-11-07T11:00:00Z"
  }
}
```

**Response 403 (Forbidden):**
```json
{
  "message": "Akses ditolak. Hanya Admin yang bisa mengakses endpoint ini."
}
```

---

### PUT /roles/:id
Update role (Admin only).

**Request Body:**
```json
{
  "nama": "Senior Manager",
  "gajiPokok": 9000000,
  "deskripsi": "Senior manager operasional"
}
```

**Response 200:**
```json
{
  "message": "Role berhasil diupdate",
  "data": {
    "id": 4,
    "nama": "Senior Manager",
    "gajiPokok": 9000000,
    "deskripsi": "Senior manager operasional",
    "updatedAt": "2025-11-07T12:00:00Z"
  }
}
```

---

### DELETE /roles/:id
Hapus role (Admin only).

**Response 200:**
```json
{
  "message": "Role berhasil dihapus",
  "data": {
    "id": 4,
    "nama": "Manager"
  }
}
```

**Response 400 (Bad Request):**
```json
{
  "message": "Tidak bisa hapus role. Masih ada 5 user yang menggunakan role ini"
}
```

---

## 🔧 Health Check

### GET /db/ping
Health check koneksi database.

**Method:** `GET`  
**Auth:** none (lokal)

**Response 200:**
```json
{
  "ok": true,
  "db": "db_restoran",
  "server": "NAMA-PC",
  "instance": null
}
```

**Response 500:**
```json
{
  "ok": false,
  "error": "Failed to connect to localhost in 15000ms"
}
```

**Troubleshooting:**
- Jika error `[object Object]`, cek console log server untuk detail
- Test koneksi: `node test-db.js`
- Verifikasi `.env` credentials
- Pastikan SQL Server running dan port 1433 accessible

---

Cara menambahkan endpoint baru:
1. Tambahkan deskripsi endpoint, method, URL path.
2. Tuliskan contoh request (headers, body) dan contoh response sukses + error.
3. Update contoh cURL / Postman / REST client.

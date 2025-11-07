# Panduan Postman — Role Management API

## Setup Awal

### 1. Buat Environment
- Klik **Environments** > **Create Environment**
- Nama: `Local Dev`
- Variables:
  - `base_url`: `http://localhost:3000`
  - `token`: (kosongkan dulu, akan diisi otomatis setelah login)

### 2. Set Environment Aktif
- Pilih `Local Dev` dari dropdown di kanan atas

---

## Flow Testing

### Step 1: Register Admin (Pertama Kali)

**POST** `{{base_url}}/auth/register`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "nama": "Super Admin",
  "email": "admin@restoran.com",
  "password": "admin123",
  "roleId": 1
}
```

**Catatan:** roleId 1 harus sudah ada di database. Jalankan seed dulu:
```sql
INSERT INTO Role (nama, gajiPokok, deskripsi) VALUES 
('Admin', 10000000, 'Administrator sistem'),
('Cashier', 5000000, 'Kasir restoran'),
('Employee', 4000000, 'Karyawan biasa');
```

---

### Step 2: Login untuk Dapat Token

**POST** `{{base_url}}/auth/login`

Body:
```json
{
  "email": "admin@restoran.com",
  "password": "admin123"
}
```

Response:
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**COPY TOKEN** dan simpan di environment variable `token`.

Atau pakai script otomatis di tab **Tests** di request login:
```javascript
pm.test("Login success", function () {
    var jsonData = pm.response.json();
    pm.environment.set("token", jsonData.token);
});
```

---

### Step 3: GET Semua Roles

**GET** `{{base_url}}/roles`

Headers:
```
Authorization: Bearer {{token}}
```

Response:
```json
{
  "message": "Daftar role berhasil diambil",
  "data": [...]
}
```

---

### Step 4: Buat Role Baru (Admin Only)

**POST** `{{base_url}}/roles`

Headers:
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

Body:
```json
{
  "nama": "Manager",
  "gajiPokok": 8000000,
  "deskripsi": "Manager operasional"
}
```

Response 201:
```json
{
  "message": "Role berhasil dibuat",
  "data": {
    "id": 4,
    "nama": "Manager",
    "gajiPokok": 8000000,
    "deskripsi": "Manager operasional"
  }
}
```

---

### Step 5: Update Role (Admin Only)

**PUT** `{{base_url}}/roles/4`

Headers:
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

Body:
```json
{
  "gajiPokok": 9000000,
  "deskripsi": "Senior manager operasional"
}
```

---

### Step 6: Delete Role (Admin Only)

**DELETE** `{{base_url}}/roles/4`

Headers:
```
Authorization: Bearer {{token}}
```

Response:
```json
{
  "message": "Role berhasil dihapus",
  "data": {...}
}
```

---

## Error Handling

### 401 Unauthorized
Token tidak ada atau salah.
```json
{
  "message": "Token tidak ditemukan. Silakan login terlebih dahulu."
}
```

**Solusi:** Login ulang dan copy token baru.

---

### 403 Forbidden
User bukan Admin.
```json
{
  "message": "Akses ditolak. Hanya Admin yang bisa mengakses endpoint ini."
}
```

**Solusi:** Login dengan akun Admin.

---

### 409 Conflict
Nama role sudah ada.
```json
{
  "message": "Role dengan nama ini sudah ada"
}
```

---

### 400 Bad Request
Role masih dipakai user.
```json
{
  "message": "Tidak bisa hapus role. Masih ada 5 user yang menggunakan role ini"
}
```

**Solusi:** Ubah roleId semua user yang pakai role ini terlebih dahulu.

---

## Tips

1. **Simpan token di environment variable** agar tidak perlu copy-paste manual setiap kali.
2. **Gunakan Tests script** untuk otomatis set token setelah login.
3. **Buat Collection** untuk grup semua request (Auth, Roles, dll).
4. **Export Collection** untuk share dengan tim.

---

## Collection Structure (Contoh)

```
📁 Management Karyawan API
  📁 Auth
    ├─ POST Register
    └─ POST Login
  📁 Roles (Admin Only)
    ├─ GET All Roles
    ├─ GET Role by ID
    ├─ POST Create Role
    ├─ PUT Update Role
    └─ DELETE Delete Role
  📁 Health
    └─ GET DB Ping
```

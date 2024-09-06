# API Documentation

## Endpoints

### General Endpoints

- `GET /`

### Public Endpoints

- `POST /register`
- `POST /login`
- `POST /login/google`

### Protected Endpoints

> Endpoints yang hanya bisa diakses oleh users yang sudah login

- `GET /characters`
- `GET /characters/:id`
- `POST /characters/:CharacterId`
- `GET /characters/:id/myCharacters`
- `PATCH /characters/:id/imageUrl`
- `DELETE /characters/:id`

&nbsp;

## USERS

### 1. `GET /`

**Description:**

- Menampilkan halaman utama atau endpoint dasar.

### 2. `POST /register`

**Description:**

- Endpoint untuk mendaftarkan user baru dengan username, email, dan password.

<span style="color:Khaki"> Request:

- `body`:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

<span style="color:Khaki"> Response:

- `201 - Created`:

```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

- `400 - BadRequest`:

```json
{
  "message": "Username is required",
  "message": "Email is required",
  "message": "Password is required"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 3. `POST /login`

**Description:**

- Endpoint untuk autentikasi user dan menghasilkan token.

<span style="color:Khaki"> Request:

- `body`:

```json
{
  "email": "string",
  "password": "string"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "access_token": "string",
  "message": "Login successful"
}
```

- `400 - BadRequest`:

```json
{
  "message": "Email is required !",
  "message": "Password is required !"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Email or Password is required"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 4. `POST /login/google`

**Description:**

- Endpoint untuk autentikasi menggunakan akun Google.

<span style="color:Khaki"> Request:

- `body`:

```json
{
  "googleToken": "string"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "access_token": "string",
  "message": "Login successful"
}
```

- `400 - BadRequest`:

```json
{
  "message": "Google token is required"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Google token"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

## CHARACTERS

### 1. `GET /characters`

**Description:**

- Mengambil daftar karakter dari API Disney dengan opsi pencarian, pagination, dan sorting.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- page (optional): Nomor halaman untuk pagination.
- pageSize (optional): Jumlah item per halaman.
- q (optional): Query string untuk pencarian karakter.


<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "page": "number",
  "pageSize": "number",
  "totalCharacters": "number",
  "totalPages": "number",
  "data": [
    {
      "id": "string",
      "films": ["string"] or null,
      "shortFilms": ["string"] or null,
      "tvShows": ["string"] or null,
      "videoGames": ["string"] or null,
      "parkAttractions": ["string"] or null,
      "allies": ["string"] or null,
      "enemies": ["string"] or null,
      "sourceUrl": "string",
      "name": "string",
      "imageUrl": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "url": "string",
      "version": "number"
    }
  ]
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `500 - Internal Server Error`:

```json
{
 "message": "ISE"
}
```

### 2. `GET /characters/:id`

**Description:**

- Mengambil detail karakter berdasarkan ID dari API Disney.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "page": "number",
  "pageSize": "number",
  "totalCharacters": "number",
  "totalPages": "number",
  "data": [
    {
      "id": "string",
      "films": ["string"] or null,
      "shortFilms": ["string"] or null,
      "tvShows": ["string"] or null,
      "videoGames": ["string"] or null,
      "parkAttractions": ["string"] or null,
      "allies": ["string"] or null,
      "enemies": ["string"] or null,
      "sourceUrl": "string",
      "name": "string",
      "imageUrl": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "url": "string",
      "version": "number"
    }
  ]
}
```

- `404 - NotFound`:

```json
{
  "message": "Character not found"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `500 - Internal Server Error`:

```json
{
 "message": "ISE"
}
```

### 3. `POST /characters/:CharacterId`

**Description:**

- Menambahkan karakter Disney ke daftar karakter pengguna.

<span style="color:Khaki"> Request:

- params: CharacterId: ID karakter Disney yang akan ditambahkan.

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

<span style="color:Khaki"> Response:

- `201 - Created`:

```json
{
  "id": "string",
  "UserId": "string",
  "CharacterId": "string",
  "imageUrl": "string" or null
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `500 - Internal Server Error`:

```json
{
 "message": "ISE"
}
```

### 4. `GET /characters/:id/myCharacters`

**Description:**

- Mengambil daftar karakter yang telah ditambahkan oleh pengguna.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
[
  {
    "id": "string",
    "UserId": "string",
    "CharacterId": "string",
    "imageUrl": "string",
    "name": "string",
    "films": ["string"] or null,
    "shortFilms": ["string"] or null,
    "tvShows": ["string"] or null,
    "videoGames": ["string"] or null,
    "parkAttractions": ["string"] or null,
    "allies": ["string"] or null,
    "enemies": ["string"] or null,
    "sourceUrl": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "url": "string",
    "version": "number"
  }
]
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `500 - Internal Server Error`:

```json
{
 "message": "ISE"
}
```

### 5. `PATCH /characters/:id/imageUrl`

**Description:**

- Memperbarui gambar karakter pengguna.

<span style="color:Khaki"> Request:

- body (form-data, file) -> imageUrl: imageUrl baru untuk karakter.

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "message": "Character image has been updated"
}
```

- `400 - BadRequest`:

```json
{
  "message": "Image URL is required"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `500 - Internal Server Error`:

```json
{
 "message": "ISE"
}
```

### 5. `DELETE /characters/:id`

**Description:**

- Menghapus karakter dari daftar karakter pengguna.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "message": "Character successfully removed from myCharacters"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `500 - Internal Server Error`:

```json
{
 "message": "ISE"
}
```


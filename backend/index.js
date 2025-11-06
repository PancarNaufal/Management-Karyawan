const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// Pakai driver Windows Auth
const sql = require('mssql/msnodesqlv8')

const app = express()
app.use(cors())
app.use(express.json())

// Pool tunggal
let pool
async function getPool() {
  if (pool && pool.connected) return pool
  const host = process.env.db_host || 'localhost'
  const inst = process.env.db_instance ? `\\${process.env.db_instance}` : ''
  const db   = process.env.db_name
  const trust = (process.env.db_trust_server_certificate || 'true') === 'true'

  const connStr =
    `Server=${host}${inst};` +
    `Database=${db};` +
    `Trusted_Connection=Yes;` +
    `Encrypt=${trust ? 'No' : 'Yes'};` +
    `Driver={ODBC Driver 17 for SQL Server};`

  pool = await sql.connect(connStr)
  return pool
}

app.get('/db/ping', async (req, res) => {
  try {
    const p = await getPool()
    const r = await p.request().query(
      "SELECT DB_NAME() AS db, @@SERVERNAME AS server, SERVERPROPERTY('InstanceName') AS instance"
    )
    res.json({ ok: true, ...r.recordset[0] })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running at http://localhost:${PORT}`)
})
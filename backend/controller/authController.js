const prisma = require('../config/prismaClient'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 


exports.register = async (req, res) => {
  const { nama, email, password, roleId } = req.body;

  try {
    if (!nama || !email || !password || !roleId) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }

    const userSudahAda = await prisma.user.findUnique({
      where: { email: email }
    });

    if (userSudahAda) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10); 


    const userBaru = await prisma.user.create({
      data: {
        nama: nama,
        email: email,
        password: hashedPassword,
        roleId: parseInt(roleId) 
      }
    });

 
    const { password: pw, ...userTanpaPassword } = userBaru;

    res.status(201).json({ 
      message: 'User berhasil terdaftar', 
      user: userTanpaPassword 
    });

  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }


    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return res.status(404).json({ message: 'Email tidak ditemukan.' });
    }

    const passwordCocok = await bcrypt.compare(password, user.password);

    if (!passwordCocok) {
      return res.status(401).json({ message: 'Password salah.' }); // 401 Unauthorized
    }

 
    const token = jwt.sign(
      { userId: user.id, email: user.email, roleId: user.roleId },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.json({
      message: 'Login berhasil',
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};
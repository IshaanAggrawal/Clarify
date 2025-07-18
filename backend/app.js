const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const connectdb = require('./utils/db')
const http=require('http')
const authRoutes=require('./routes/user.route')
const roomRoutes=require('./routes/room.route')

dotenv.config()

const app=express();

const server=http.createServer(app);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    connectdb()
    console.log(`Server is running on http://localhost:${PORT}`);
})
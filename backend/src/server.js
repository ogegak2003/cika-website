import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cika-chat'
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

const chatMessageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: Date,
  sessionId: String
})

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)

const activeSessions = new Map()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  const sessionId = socket.handshake.query.sessionId || socket.id
  activeSessions.set(socket.id, sessionId)

  ChatMessage.find({ sessionId })
    .sort({ timestamp: 1 })
    .then(messages => {
      socket.emit('chat history', messages)
    })

  socket.on('chat message', async (messageData) => {
    try {
      const message = new ChatMessage({
        ...messageData,
        sessionId,
        timestamp: new Date()
      })

      await message.save()

      io.emit('chat message', message)

      setTimeout(async () => {
        const adminMessage = new ChatMessage({
          text: "Thank you for your message! Our support team will get back to you shortly. In the meantime, is there anything specific you'd like to know about our services?",
          sender: 'admin',
          sessionId,
          timestamp: new Date()
        })

        await adminMessage.save()
        io.emit('chat message', adminMessage)
      }, 2000)

    } catch (error) {
      console.error('Error saving message:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    activeSessions.delete(socket.id)
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
import React, { createContext, useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001')
    
    newSocket.on('connect', () => {
      setIsConnected(true)
      console.log('Connected to chat server')
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from chat server')
    })

    newSocket.on('chat message', (message) => {
      setMessages(prev => [...prev, message])
    })

    newSocket.on('chat history', (history) => {
      setMessages(history)
    })

    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  const sendMessage = (message) => {
    if (socket && message.trim()) {
      const chatMessage = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date().toISOString()
      }
      socket.emit('chat message', chatMessage)
      setMessages(prev => [...prev, chatMessage])
    }
  }

  const value = {
    socket,
    isChatOpen,
    setIsChatOpen,
    messages,
    sendMessage,
    isConnected
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}
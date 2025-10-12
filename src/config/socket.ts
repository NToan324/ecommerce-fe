'use client'

import Cookies from 'js-cookie'
import { io, Socket } from 'socket.io-client'

import { Review } from '@/types/product.type'

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'

class SocketConfig {
  private socket: Socket | null = null

  // Khởi tạo socket
  init() {
    const token = Cookies.get('accessToken')

    this.socket = io(URL, {
      autoConnect: false,
      transports: ['websocket'],
      withCredentials: true,
      auth: {
        token,
      },
    })
  }

  connect() {
    if (!this.socket) this.init()

    if (this.socket && !this.socket.connected) {
      this.socket.connect()
      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket?.id)
      })
      this.socket.on('disconnect', () => {
        console.log('❌ Socket disconnected')
      })
    } else {
      console.log('Socket already connected or not initialized')
    }
  }

  disconnect() {
    if (this.socket?.connected) {
      this.socket.disconnect()
      console.log('Socket disconnected')
    }
  }

  joinRoom(roomId: string) {
    if (!this.socket) this.init()

    const emitJoin = () => {
      if (this.socket?.connected) {
        this.socket.emit('join_room', { product_variant_id: roomId })
        console.log(`Joined room: ${roomId}`)
      } else {
        console.log('Socket still not connected after waiting — cannot join room')
      }
    }

    if (this.socket?.connected) {
      emitJoin()
      return
    }

    // If not connected, try to connect then emit once on connect
    this.connect()
    const handler = () => {
      emitJoin()
      // remove this listener after first run
      this.socket?.off('connect', handler)
    }
    this.socket?.on('connect', handler)
  }

  leaveRoom(roomId: string) {
    if (!this.socket) this.init()

    const emitLeave = () => {
      if (this.socket?.connected) {
        this.socket.emit('leave_room', roomId)
        console.log(`Left room: ${roomId}`)
      } else {
        console.log('Socket still not connected after waiting — cannot leave room')
      }
    }

    if (this.socket?.connected) {
      emitLeave()
      return
    }

    this.connect()
    const handler = () => {
      emitLeave()
      this.socket?.off('connect', handler)
    }
    this.socket?.on('connect', handler)
  }

  addReview(productId: string, content: string, rating?: number) {
    if (this.socket?.connected) {
      console.log('Emitting add_review event')
      this.socket.emit('add_review', { product_variant_id: productId, content, rating }, (value: Review) =>
        console.log('Server acknowledgment:', value)
      )
    } else {
      console.log('Socket not connected — cannot add review')
    }
  }

  on(event: string, callback: (data: Review) => void) {
    if (this.socket) {
      this.socket.on(event, callback)
    } else {
      console.log('Socket not initialized — cannot set event listener')
    }
  }
}

const socketConfig = new SocketConfig()
export default socketConfig

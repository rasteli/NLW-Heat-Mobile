import React, { useState, useEffect } from "react"
import { ScrollView } from "react-native"
import { io } from "socket.io-client"

import { styles } from "./styles"
import { api } from "../../services/api"
import { Message, MessageProps } from "../Message"

const messagesQueue: MessageProps[] = []
const socket = io(String(api.defaults.baseURL))

socket.on("new_message", newMessage => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    async function getMessages() {
      const response = await api.get<MessageProps[]>("/messages/last3")
      setMessages(response.data)
    }

    getMessages()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevMessages => [
          messagesQueue[0],
          prevMessages[0],
          prevMessages[1]
        ])
        messagesQueue.shift()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {messages.map(message => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  )
}

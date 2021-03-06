import React from "react"
import { Text, View } from "react-native"
import { MotiView } from "moti"

import { styles } from "./styles"
import { UserPhoto } from "../UserPhoto"

export type MessageProps = {
  id: string
  text: string
  user: {
    login: string
    avatar_url: string
  }
}

type Props = {
  data: MessageProps
}

export function Message({ data }: Props) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>{data.text}</Text>

      <View style={styles.footer}>
        <UserPhoto imageUri={data.user.avatar_url} size="SMALL" />
        <Text style={styles.userName}>{data.user.login}</Text>
      </View>
    </MotiView>
  )
}

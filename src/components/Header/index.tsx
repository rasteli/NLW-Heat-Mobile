import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

import { styles } from "./styles"
import { UserPhoto } from "../UserPhoto"
import LogoSvg from "../../assets/logo.svg"
import { useAuth } from "../../contexts/AuthContext"

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <View style={styles.container}>
      <LogoSvg />

      {user ? (
        <View style={styles.logoutButton}>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
          <UserPhoto imageUri={user.avatar_url} size="NORMAL" />
        </View>
      ) : (
        <UserPhoto size="NORMAL" />
      )}
    </View>
  )
}

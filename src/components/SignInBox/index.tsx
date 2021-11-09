import React from "react"
import { View } from "react-native"

import { styles } from "./styles"
import { Button } from "../Button"
import { COLORS } from "../../theme"
import { useAuth } from "../../contexts/AuthContext"

export function SignInBox() {
  const { signIn, isSigningIn } = useAuth()

  return (
    <View style={styles.container}>
      <Button
        title="ENTRAR COM GITHUB"
        icon="github"
        backgroundColor={COLORS.YELLOW}
        color={COLORS.BLACK_PRIMARY}
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  )
}

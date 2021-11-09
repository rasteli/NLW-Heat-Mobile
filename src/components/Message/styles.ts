import { StyleSheet } from "react-native"
import { COLORS, FONTS } from "../../theme"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 36
  },

  footer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },

  message: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    lineHeight: 20,
    marginBottom: 12
  },

  userName: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAY_PRIMARY,
    marginLeft: 16
  }
})

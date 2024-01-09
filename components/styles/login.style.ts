import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const loginStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    fontWeight: "bold",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.small,
    height: 50,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  inputStyle: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    height: "100%",
    gap: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginActionWrapper: {
    display: "flex",
    width: "100%",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.medium,
  },
  loginSwitchText: {
    fontWeight: "bold",
    width: "100%",
    marginLeft: SIZES.xSmall,
  },
});

export default loginStyles;

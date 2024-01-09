import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  title: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    fontWeight: "bold",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tableCell: {
    color: COLORS.gray2,
    fontWeight: "bold",
    marginHorizontal: 2,
    textAlign: "center",
    width: 70,
  },
  tableBody: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  totalAmount: {
    backgroundColor: COLORS.blue2Light,
    color: COLORS.blue2Dark,
    fontSize: 12,
    paddingVertical: 1,
    paddingHorizontal: 4,
    fontWeight: "bold",
    borderRadius: 4,
  },
  perPerson: {
    fontSize: 12,
    paddingVertical: 1,
    paddingHorizontal: 4,
    fontWeight: "bold",
    borderRadius: 4,
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
    ...SHADOWS.small,
    shadowColor: COLORS.white,
  },
  statusText: { fontSize: 16, fontWeight: "bold", color: COLORS.gray2 },
  statsBalance: {
    paddingVertical: 1,
    paddingHorizontal: 4,
    fontWeight: "bold",
    borderRadius: 4,
  },
  adminUserContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    ...SHADOWS.small,
    shadowColor: COLORS.white,
    marginBottom: 10,
  },
  adminUserWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  adminUserName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray2,
  },
  adminActionButton: {
    paddingVertical: 1,
    paddingHorizontal: 8,
    fontWeight: "bold",
    borderRadius: 6,
  },
});

export default styles;

import React from "react";
import { Modal, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants/theme";
import Button from "./Button";
const LoadingModal = ({
  open,
  onRequestClose,
}: {
  open: boolean;
  onRequestClose: any;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onRequestClose}
    >
      <View style={stylesModal.modalContainer}>
        <View style={stylesModal.modalContent}>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 20,
    height: 20,
    padding: 30,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    alignItems: "center",
  },
});

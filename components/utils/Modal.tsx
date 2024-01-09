import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { COLORS } from "../../constants/theme";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";
const AlertModal = ({
  title,
  open,
  onRequestClose,
  hostelID,
}: {
  title: string;
  open: boolean;
  onRequestClose: any;
  hostelID?: string;
}) => {
  const handleCopyToClipboard = () => {
    Clipboard.setString(hostelID as string);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onRequestClose}
    >
      <View style={stylesModal.modalContainer}>
        <View style={stylesModal.modalContent}>
          <Text
            style={{ fontSize: 18, fontWeight: "500", paddingVertical: 10 }}
          >
            {title}
          </Text>

          {hostelID && (
            <View
              style={{
                alignItems: "center",
                marginVertical: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <Text>Your hostel ID: {hostelID}</Text>
              <TouchableOpacity
                onPress={handleCopyToClipboard}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <AntDesign name="copy1" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          )}
          <Button
            title="OK"
            disabled={false}
            onPress={onRequestClose}
            variant="small"
          />
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

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
    width: 300,
    padding: 20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    alignItems: "center",
  },
});

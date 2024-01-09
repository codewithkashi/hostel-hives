import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import styles from "./button.style";
import { SIZES } from "../../constants/theme";

const Button = ({
  title,
  onPress,
  variant,
  disabled,
}: {
  title: string;
  onPress: any;
  variant: string;
  disabled: boolean;
}) => {
  return (
    <View
      style={{
        width: variant === "small" ? "40%" : "100%",
        height: 50,
      }}
    >
      <TouchableOpacity
        style={[styles.applyBtn, disabled && styles.applyBtnDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.applyBtnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

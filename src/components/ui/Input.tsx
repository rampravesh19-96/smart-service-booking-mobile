import { forwardRef } from "react";
import { Text, TextInput, View, StyleSheet, TextInputProps } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, placeholder, value, error, style, editable = true, ...props },
  ref,
) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, error ? styles.inputError : null, style]}
        value={value}
        selectionColor={colors.accent400}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    fontWeight: "600",
  },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    fontSize: typography.body,
  },
  inputError: {
    borderColor: colors.danger500,
  },
  error: {
    color: colors.danger500,
    fontSize: typography.caption,
    fontWeight: "600",
  },
});

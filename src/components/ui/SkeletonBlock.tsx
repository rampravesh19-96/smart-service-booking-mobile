import { StyleSheet, View } from "react-native";

import { colors, radius } from "@/theme";

type SkeletonBlockProps = {
  height?: number;
};

export function SkeletonBlock({ height = 20 }: SkeletonBlockProps) {
  return <View style={[styles.block, { height }]} />;
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.skeleton,
    borderRadius: radius.md,
    width: "100%",
  },
});

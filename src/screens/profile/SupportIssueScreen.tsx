import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useSubmitSupportRequest } from "@/hooks/useSupport";
import { colors, typography } from "@/theme";
import { ProfileStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<ProfileStackParamList, "SupportIssue">;

export function SupportIssueScreen({ route }: Props) {
  const [issueTitle, setIssueTitle] = useState(route.params?.issueTitle ?? "");
  const submitSupportRequest = useSubmitSupportRequest();
  const [ticketId, setTicketId] = useState<string>();

  const handleSubmit = async () => {
    if (!issueTitle.trim()) {
      return;
    }

    const result = await submitSupportRequest.mutateAsync({
      categoryId: route.params?.categoryId ?? "general",
      issueTitle: issueTitle.trim(),
    });

    setTicketId(result.ticketId);
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Support request"
          subtitle="Simple issue submission flow to show support routing and success feedback."
        />
      }
    >
      <Card>
        <Input
          label="Issue summary"
          onChangeText={setIssueTitle}
          placeholder="Describe the issue briefly"
          value={issueTitle}
        />
      </Card>

      {ticketId ? (
        <Card>
          <Text style={styles.success}>Request submitted</Text>
          <Text style={styles.copy}>Support ticket {ticketId} has been created for follow-up.</Text>
        </Card>
      ) : null}

      <Button
        disabled={!issueTitle.trim()}
        label="Submit Request"
        loading={submitSupportRequest.isPending}
        onPress={handleSubmit}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  success: {
    color: colors.success500,
    fontSize: typography.body,
    fontWeight: "800",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});

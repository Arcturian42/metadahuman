import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { colors } from "@/config/design-tokens";

// Tailwind classes don't apply inside react-pdf; styles come from design tokens
// (design-tokens.ts is the single source for PDF/OG contexts — DESIGN_SYSTEM §14).
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bgPrimary,
    color: colors.textPrimary,
    paddingTop: 56,
    paddingBottom: 64,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
  },
  kicker: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.accentSecondary,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  coverTitle: { fontSize: 30, color: colors.textPrimary, marginBottom: 8 },
  coverName: { fontSize: 16, color: colors.accentPrimary, marginBottom: 4 },
  coverMeta: { fontSize: 10, color: colors.textMuted, marginBottom: 24 },
  sectionTitle: { fontSize: 18, color: colors.textPrimary, marginBottom: 4, marginTop: 20 },
  sectionSubtitle: { fontSize: 11, color: colors.accentPrimary, marginBottom: 8 },
  body: { fontSize: 11, color: colors.textSecondary, lineHeight: 1.6, marginBottom: 8 },
  numbersRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8, marginBottom: 8 },
  numberCell: {
    width: "25%",
    padding: 6,
  },
  numberValue: { fontSize: 18, color: colors.accentPrimary },
  numberLabel: { fontSize: 8, color: colors.textMuted, textTransform: "capitalize" },
  prompt: {
    fontSize: 10,
    color: colors.accentSecondary,
    fontStyle: "italic",
    marginTop: 6,
    marginBottom: 8,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    fontSize: 8,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 1.5,
  },
});

const DISCLAIMER =
  "This report is a reflection and entertainment tool based on numerology and astrology traditions. It is not scientific, medical, psychological, legal, or financial advice.";

interface Section {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
  data?: Record<string, unknown>;
}

export interface ReportPdfProps {
  firstName: string;
  lastName?: string | null;
  generatedOn: string;
  sections: Section[];
  numbers: Record<string, number>;
}

export function ReportPdf({ firstName, lastName, generatedOn, sections, numbers }: ReportPdfProps) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  return (
    <Document title={`Personal Metadata — ${fullName}`}>
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.kicker}>Free Symbolic Report</Text>
        <Text style={styles.coverTitle}>Personal Metadata Report</Text>
        <Text style={styles.coverName}>Prepared for {fullName}</Text>
        <Text style={styles.coverMeta}>Generated on {generatedOn}</Text>

        <View style={styles.numbersRow}>
          {Object.entries(numbers).map(([key, value]) => (
            <View key={key} style={styles.numberCell}>
              <Text style={styles.numberValue}>{String(value)}</Text>
              <Text style={styles.numberLabel}>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
            </View>
          ))}
        </View>

        {sections.map((section) => (
          <View key={section.id} wrap={false}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.subtitle ? <Text style={styles.sectionSubtitle}>{section.subtitle}</Text> : null}
            {section.body ? <Text style={styles.body}>{section.body}</Text> : null}
            {typeof section.data?.practicalPrompt === "string" ? (
              <Text style={styles.prompt}>Reflection: {section.data.practicalPrompt as string}</Text>
            ) : null}
            {typeof section.data?.invitation === "string" ? (
              <Text style={styles.prompt}>Invitation: {section.data.invitation as string}</Text>
            ) : null}
          </View>
        ))}

        <Text style={styles.footer} fixed>
          {DISCLAIMER}
        </Text>
      </Page>
    </Document>
  );
}

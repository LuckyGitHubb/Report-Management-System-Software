import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },

  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 25,
    fontWeight: "bold",
  },

  reportName: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #d1d5db",
    paddingVertical: 10,
  },

  label: {
    width: "40%",
    fontWeight: "bold",
  },

  value: {
    width: "60%",
  },
});

const ReportPDF = ({ item }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Report</Text>

        <Text style={styles.reportName}>
          Report Name: {item?.reportTemplate?.reportName}
        </Text>

        <View>
          {item?.reportData?.map((data, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.label}>{data.label}</Text>
              <Text style={styles.value}>{data.value}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
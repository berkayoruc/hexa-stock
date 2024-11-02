"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { createQRCodeAsBase64 } from "../../utils/createQrAsBase64";

const PDFDocument = ({ products }) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 8,
    //   padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {products[0].map((product, index) => (
            <View
              key={index}
              style={{
                marginVertical: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                padding: "8px",
              }}
            >
              <Image
                style={{ width: 160 }}
                src={createQRCodeAsBase64(
                  `${window.location.origin}/product?id=${product?.id}`
                )}
              />
              <Text style={{ fontSize: "12px" }}>{product?.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          {products[1].map((product, index) => (
            <View
              key={index}
              style={{
                marginVertical: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                padding: "8px",
              }}
            >
              <Image
                style={{ width: 160 }}
                src={createQRCodeAsBase64(
                  `${window.location.origin}/product?id=${product?.id}`
                )}
              />
              <Text style={{ fontSize: "12px" }}>{product?.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          {products[2].map((product, index) => (
            <View
              key={index}
              style={{
                marginVertical: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                padding: "8px",
              }}
            >
              <Image
                style={{ width: 160 }}
                src={createQRCodeAsBase64(
                  `${window.location.origin}/product?id=${product?.id}`
                )}
              />
              <Text style={{ fontSize: "12px" }}>{product?.name}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;

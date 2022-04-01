import * as React from "react";
import { WebView } from "react-native-webview";

export default function WebViewPage() {
  return <WebView source={{ uri: "https://cadastrapet.com.br/entrar" }} />;
}

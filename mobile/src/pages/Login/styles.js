import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5FF",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 24,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  image: {
    width: 230,
    height: 50,
    resizeMode: "contain",
  },
  subtitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#566dea",
    marginVertical: 8,
  },
  subsubtitle: {
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#6CA6FD",
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  buttonGroup: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 24,
    bottom: 0,
  },
  buttonLogin: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginHorizontal: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    backgroundColor: "#566DEA",
    borderColor: "#566DEA",
    borderWidth: 2,
  },
});

import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5FF",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "relative",
  },
  petImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#566DEA",
    resizeMode: "cover",
  },
  image: {
    marginVertical: 32,
    width: 180,
    height: 30,
    resizeMode: "contain",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#566DEA",
    textAlign: "center",
    marginBottom: 22,
  },
  scrollView: {
    marginVertical: 4,
    width: Dimensions.get("window").width,
    paddingHorizontal: 14,
  },
  addPetButton: {
    borderRadius: 8,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
    padding: 16,
  },
  addPetButtonText: {
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 18,
    color: "#566DEA",
    fontFamily: "Poppins_400Regular",
  },
});

import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: "#000",
    alignItems: "center",
  },
  noResult: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  flatList: {
    flex: 1,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContentContainer: {
    padding: 35,
    paddingBottom: 100,
  },
  header: {
    padding: 25,
  },
  headerText: {
    marginTop: 10,
    fontSize: 24,
    lineHeight: 45,
    color: "#FFF",
  },
  containerInput: {
    backgroundColor: "#2C2C2E",
    height: 42,
    padding: 10,
    borderRadius: 16,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    color: "#FFF",
    width: "85%",
    paddingLeft: 15,
    paddingVertical: 0, // Remove padding vertical para centralizar o texto
    height: "150%",
    shadowColor: "#2C2C2E"
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

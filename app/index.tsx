import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#00457D", "#05051F"]}
      style={style.container}
    >
      <Image source={require("../assets/images/Logo.svg")} />
      <Image source={require("../assets/images/weather.png")} />
      <Text style={style.title}>Boas-vindas!</Text>

      <TouchableOpacity
        onPress={() => {router.push("/cities")}}
        style={style.button}
      >
        <Text style={style.buttonText}>Entrar</Text>
        <MaterialIcons name='arrow-forward' size={24} color={"#01080E"} />
      </TouchableOpacity>

    </LinearGradient>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 64,
    paddingVertical: 79,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "Montserrat_400Regular"
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#7693FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    flexDirection: "row",
    gap: 8
  },
  buttonText: {
    color: "#01080E",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold"
  }
})
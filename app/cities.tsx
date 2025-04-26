import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import citiesData from "../data/cities.json";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const Cities = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [filteredCities, setFilteredCities] = useState(citiesData);

    useEffect(() => {
        const newFilteredCities = citiesData.filter(city => city.city.toLocaleLowerCase().includes(search.toLowerCase()));
        setFilteredCities(newFilteredCities);

    }, [search]);

    return (
        <LinearGradient
            colors={["#00457D", "#05051F"]}
            style={style.container}
        >
            <View style={style.inputContainer}>
                <TextInput
                    placeholder="Digite a cidade"
                    style={style.input}
                    value={search}
                    onChangeText={(value) => setSearch(value)}
                />
                <MaterialIcons name='search' size={18} color={"#fff"} />
            </View>
            <ScrollView>
                <View style={style.scrollList}>
                    {filteredCities.map((city) => (
                        <TouchableOpacity
                            onPress={() => {
                                router.push(`/${city.city}`)
                            }}
                            style={style.listItem}
                            key={city.city}>
                            <Image style={style.cityImage} source={require("../assets/images/Vector.png")} />
                            <Text style={style.cityName}>{city.city.replace(", ", " - ")}</Text>
                            <Text style={style.cityTemp}>{city.temp}º</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

        </LinearGradient>
    );
}

export default Cities;

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        gap: 4,
        paddingTop: 40,
    },
    scrollList: {
        gap: 16,
    },
    listItem: {
        height: 63,
        width: "100%",
        backgroundColor: "rgba(255,255,255, 0.15)",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 16,
        flexDirection: "row",
        paddingHorizontal: 16,
    },
    cityName: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "Montserrat_500Medium"
    },
    cityTemp: {
        color: "#fff",
        fontSize: 25,
        fontFamily: "Montserrat_700Bold",
    },
    cityImage: {
        width: 27,
        height: 24,
    },
    inputContainer: {
        height: 36,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    input: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat_500Medium",
    }
})
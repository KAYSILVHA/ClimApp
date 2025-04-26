import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CityDetails = () => {
    const searchParams = useLocalSearchParams();
    const [cityDetails, setCityDetails] = useState(null);
    const router = useRouter();

    const handleData = async () => {
        try {
            const response = await fetch("https://climapp-api.vercel.app/api");
            const responseJSON = await response.json();

            const city = responseJSON.find(
                (cityData) => cityData.city === searchParams.cityName
            );

            setCityDetails(city);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    if (!cityDetails) {
        return (
            <LinearGradient colors={["#00457d", "#05051f"]} style={style.container} />
        );
    };

    return (
        <LinearGradient
            colors={["#00457d", "#05051f"]}
            style={style.container}>
            <View>
                <TouchableOpacity
                    style={style.headerIcon}
                    onPress={() => { router.push("/cities") }}
                >
                    <MaterialIcons
                        name="chevron-left"
                        size={24}
                        color={"#fff"}
                    />
                </TouchableOpacity>
                <Text style={style.headerTitle}>{cityDetails.city}</Text>
            </ View>
            <View style={style.card}>
                <View style={style.cardHeader}>
                    <Text style={style.cardHeaderTitle}>Hoje</Text>
                    <Text style={style.cardHeaderTitle}>{cityDetails.date}</Text>
                </View>
            </View>
            <View style={style.cardBox}>
                <Image
                    source={require("../assets/images/Vector.png")}
                    style={style.cardImage}
                />

                <View>
                    <Text style={style.cardTemperature}>{cityDetails.temp}°</Text>
                    <Text style={style.cardDescription}>{cityDetails.description}</Text>
                </View>
            </View>

            <View style={style.rowBox}>
                <View style={style.row}>
                    <Image source={require("../assets/images/humidade.svg")} />

                    <Text style={style.rowTitle}>Humidity:</Text>

                    <Text style={style.rowValue}>{cityDetails.humidity}%</Text>
                </View>

                <View style={style.row}>
                    <Image source={require("../assets/images/temperatura.svg")} />

                    <Text style={style.rowTitle}>Min/Max:</Text>

                    <Text style={style.rowValue}>
                        {cityDetails.forecast[0].min}/{cityDetails.forecast[0].max}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );


}

export default CityDetails;

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
        gap: 40,
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Montserrat_600SemiBold",
    },
    card: {
        width: "100%",
        borderRadius: 24,
        backgroundColor: "#4463D5",
        padding: 16,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    cardHeaderTitle: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat_600SemiBold",
    },
    headerIcon: {
        position: "absolute",
        left: 0,
        zIndex: 10,
    },
    cardImage: {
        width: 72,
        height: 64,
    },
    cardTemperature: {
        color: "#fff",
        fontSize: 43,
        fontFamily: "Montserrat_700Bold",
        textAlign: "center",
    },
    cardDescription: {
        color: "#fff",
        fontSize: 13,
        fontFamily: "Montserrat_400Regular",
        textAlign: "center",
    },
    cardBox: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rowTitle: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat_600SemiBold",
    },
    rowValue: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        marginLeft: "auto",
    },
    rowBox: {
        gap: 8,
    },
});
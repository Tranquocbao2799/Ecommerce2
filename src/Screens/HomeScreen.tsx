import {View, Text, Platform, ScrollView, Pressable, Alert} from 'react-native';
import React, {useCallback, useEffect, useRef,useState} from 'react';
import { TabsStackScreenProps } from '../Navigation/TabsNavigator';
import { SafeAreaView } from 'react-native';
import { HeadersComponent } from '../Components/HeaderComponent/HeaderComponent';
import ImageSlider from './../Components/HomeScreenComponents/ImageSlider';
import { ProductListParams } from './../TypesCheck/HomeProps';
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard';
import { fetchCategories, fetchProductsByCatID } from '../MiddeleWare/HomeMiddeWare';
import { useFocusEffect } from '@react-navigation/native';
import { getProductsByCatID } from '../../apiMongoDB/Controllers';



type Props = {}

const HomeScreen = ({navigation, route}: TabsStackScreenProps<"Home">) => {
    const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);

    const gotoCartScreen = () => {
        navigation.navigate("Cart")
    }

    const sliderImages = [
        "https://t4.ftcdn.net/jpg/07/08/47/75/360_F_708477508_DNkzRIsNFgibgCJ6KoTgJjjRZNJD4mb4.jpg",
        "https://m.media-amazon.com/images/I/71qTm-Xrh0L.jpg",
    ]

    const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
    const [activeCat, setActiveCat] = useState<string>("")

    useEffect(() => {
        fetchCategories({setGetCategory});
    }, []);

    useEffect(() => {
        console.log("fetchProductByCatID: ", fetchProductsByCatID);
        if(activeCat) {
            fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat});
        }
    }, [activeCat]);

    useFocusEffect(
        useCallback(() => {
            fetchCategories({setGetCategory});
            if (activeCat){
                fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat});
            }
        }, [activeCat]) //dependency array rong de tranh goi lai khong can thiet!
    );


    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40:0, flex: 1, backgroundColor: "black"}}>
            <HeadersComponent gotoCartScreen={gotoCartScreen}/>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style= {{backgroundColor:"#efg"}}>
                    <ImageSlider images={sliderImages}/>
            </ScrollView>
            <View style={{ backgroundColor: "yellow", flex: 1}}>
                <Text>
                    Hello
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle = {{paddingHorizontal: 15}}
                    style= {{margin: 4}}
                >
                    {
                        getCategory.map((item, index) => (
                            <CategoryCard
                                item={{ "name" : item.name, "images" : item.images, _id : item._id}}
                                catStyleProps={{
                                    "height": 50,
                                    "width": 55,
                                    "radius": 20,
                                    "resizeMode": "contain"
                                }}
                                catProps={{
                                    "activeCat": activeCat,  "onPress" : () => setActiveCat(item._id)
                                }}
                            />
                        ))
                    }

                </ScrollView>
            </View>

            <View style= {{
                backgroundColor: "pink", flexDirection: "row", justifyContent: "space-between",
                marginTop: 10
            }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10}}>
                    Products from Selected Category
                </Text>
                <Pressable>
                    <Text style= {{fontSize: 11, fontWeight: "bold", padding: 10}}>
                        See all
                    </Text>
                </Pressable>
            </View>

            <View style= {{
                backgroundColor: "#fff", borderWidth: 7, borderColor: "green", flexDirection: "row",
                justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"
            }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        getProductsByCatID?.length> 0 ? (
                            getProductsByCatID.map((item, index) => (
                                <CategoryCard
                                    key={index}
                                    item={{"name": item.name, "images": item.images, "_id": item._id}}
                                    catStyleProps={{
                                        "height": 100,
                                        "width": 100,
                                        "radius": 10,
                                        "resizeMode": "contain"
                                    }}
                                    catProps={{
                                        "onPress": () => Alert.alert(item.name)
                                    }}
                                 />
                            ))
                        ) : (
                            <Text> Khong co san pham nao</Text>
                        )}
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
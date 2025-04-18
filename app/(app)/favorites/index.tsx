import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { useAuthAndStyle } from "../../../context/Context"
import { ItemBook } from "../../../components/ComponentItemBook"
import { useEffect, useState } from "react"
import { apiBooksIdGet } from "../../../api/generated/helloAPIPlatform"

const FavoriteScreen = () => {
    const { currentUser, colors } = useAuthAndStyle()


    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [favoriteBooks, setFavoriteBooks] = useState([])



    const fetchData = async () => {


        setIsLoading(true)
        if (!currentUser.favoriteBooks) return; // add a check to avoid errors

        try {
            // Map over the favoriteBooks to create an array of promises
            const promises = currentUser.favoriteBooks.map(async element => {
                const id = element.book.split("/")[3];
                return await apiBooksIdGet(id);
            });

            // Wait for all promises to resolve
            const results = await Promise.all(promises);

            // Once all are resolved, update state
            setFavoriteBooks(results);
            console.log("Loaded books count:", results.length);
        } catch (error) {
            console.error("Error fetching favorite books:", error);
        } finally {
            setIsLoading(false)
        }
    };


    useEffect(() => {
        fetchData()

    }, [currentUser.favoriteBooks])



    return (

        <View style={{ flex: 1, backgroundColor: colors.background }}>


            {isLoading ?
                (<ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />) :

                <>
                    {favoriteBooks.length != 0 ?
                        <FlatList
                            numColumns={2}
                            data={favoriteBooks}  // Use the books from the reducer state
                            renderItem={({ item }) => <ItemBook book={item} />}
                            keyExtractor={(item) => item['@id']}
                            contentContainerStyle={{ padding: 16 }}
                        />


                        :
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{color:colors.primary}}>Todavía no tienes ningún favorito, a que esperas?</Text>
                        </View>}
                </>
            }
        </View>
    )

}
export default FavoriteScreen
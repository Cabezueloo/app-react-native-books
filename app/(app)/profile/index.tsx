import { Button, FlatList, Text, View } from "react-native"
import { ThemedView } from "../../../components/ThemedView"
import { useAuthAndStyle } from "../../../context/Context"
import CustomTextInput from "../../../components/CustomTextInput";
import { ThemedText } from "../../../components/ThemedText";
import { useEffect, useState } from "react";
import { apiBooksIdGet } from "../../../api/generated/helloAPIPlatform";
import { ActivityIndicator } from "react-native-paper";
import { ItemBook } from "../../../components/ComponentItemBook";
import { BookJsonldBookRead } from "../../../api/model";



const ProfileScreen = () => {

    const { signOut, colors, currentUser } = useAuthAndStyle();

    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [myBooks, setMyBooks] = useState<BookJsonldBookRead[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchData = async () => {


        setIsLoading(true)
        if (!currentUser.books) return; // add a check to avoid errors

        try {
            // Map over the favoriteBooks to create an array of promises
            const promises = currentUser.books.map(async element => {
                const id = element.split("/")[3];
                return await apiBooksIdGet(id);
            });

            // Wait for all promises to resolve
            const results = await Promise.all(promises);

            // Once all are resolved, update state
            setMyBooks(results);
        } catch (error) {
            console.error("Error fetching favorite books:", error);
        }
    };


    useEffect(() => {
        fetchData()
        setIsLoading(false)
    }, [currentUser.books])


    return (



        <>

            <ThemedView type="container">

                <ThemedText type="title"> Profile</ThemedText>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <CustomTextInput
                        editable={isEditable}
                        value={currentUser.name}
                        placeholderTextColor={colors.text}
                        style={{ color: colors.text, marginEnd: 50 }}
                    />


                    <CustomTextInput
                        editable={isEditable}
                        value={currentUser.surname}
                        placeholderTextColor={colors.text}
                        style={{ color: colors.text }}
                    />


                </View>

                <CustomTextInput
                    editable={isEditable}
                    value={currentUser.username}
                    placeholderTextColor={colors.text}
                    style={{ color: colors.text }}
                />

                <CustomTextInput
                    editable={isEditable}
                    value={currentUser.email}
                    placeholderTextColor={colors.text}
                    style={{ color: colors.text }}
                />


                <CustomTextInput
                    editable={isEditable}
                    placeholder="Current password"
                    placeholderTextColor={colors.text}
                    style={{ color: colors.text }}
                />


                <CustomTextInput

                    placeholder="New password"
                    placeholderTextColor={colors.text}
                    style={{ color: colors.text }}
                />

                <View style={{ flexDirection: 'row' }}>

                    {!isEditable ?
                        <Button title="Editar" onPress={() => { setIsEditable(true) }} color={colors.warning}></Button>
                        :
                        <Button title="Guardar" onPress={() => { }} color={colors.secondary}></Button>
                    }

                    <Button disabled={!isEditable} title="Cancelar" onPress={() => { }}></Button>
                </View>
                <Button
                    color={colors.primary}
                    title="Sign out"
                    onPress={signOut}
                />

            </ThemedView>

            <ThemedView style={{ marginTop: 50 }} type="containerItems">
                <ThemedText type="subtitle" style={{ alignContent: 'center', textAlign: 'center' }}>Mis libros</ThemedText>
                {isLoading ?
                    (<ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />) :

                    <>
                        {myBooks.length != 0 ?
                            <FlatList
                                numColumns={2}
                                data={myBooks}  // Use the books from the reducer state
                                renderItem={({ item }) => <ItemBook book={item} />}
                                keyExtractor={(item) => item['@id'] || Math.random().toString()}
                                contentContainerStyle={{ padding: 16 }}
                            />


                            :
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{ color: colors.primary }}>Todavía no tienes ningún favorito, a que esperas?</Text>
                            </View>}
                    </>
                }

            </ThemedView>


        </>


    )

}
export default ProfileScreen

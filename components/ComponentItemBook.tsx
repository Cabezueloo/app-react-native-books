import { Image, Text, View, StyleSheet, Touchable, Pressable } from "react-native"
import { BookJsonldBookRead, FavoriteBookJsonldUserRead } from "../api/model"
import { getCategoryName } from "../constants/types"
import { apiFavoriteBooksIdDelete, apiFavoriteBooksPost, apiMediaObjectsIdGet } from "../api/generated/helloAPIPlatform"
import { useEffect, useState } from "react"
import { useAuthAndStyle } from "../context/Context"
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from "./ThemedText"

export const ItemBook = ({ book }: { book: BookJsonldBookRead }) => {
    const [imageURI, setImageURI] = useState('')
    const { currentUser } = useAuthAndStyle()
    const [favoriteBook, setFavoriteBook] = useState<FavoriteBookJsonldUserRead[]>([])
    const [isInterchangeable,setIsInterchangeable] = useState(book.isInterchangeable==undefined?"Ud":"S")
    const [isFavorite, setIsFavorite] = useState<boolean>(null)
    const [favoriteBookId, setFavoriteBookId] = useState("-1")
    const { apiMe } = useAuthAndStyle()

    useEffect(() => {
        const getImage = async () => {
            try {
                if (book.image && typeof book.image === "string") {
                    // Split only if the string exists and is valid
                    const parts = book.image.split("/");
                    if (parts.length > 3) {
                        const imageId = parts[3];
                        const image = await apiMediaObjectsIdGet(imageId);
                        setImageURI(image.contentUrl);
                    } else {
                        console.error("Unexpected image URL format:", book.image);
                    }
                } else {
                    console.error("book.image is undefined or not a string:", book);
                }
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };

        getImage();
        setFavoriteBook(currentUser.favoriteBooks || []);
    }, [currentUser.favoriteBooks]); // Update when favorites change




    useEffect(() => {
        setIsFavorite(check_favorites);
    }, [favoriteBook, book])


    const check_favorites = (): boolean => {


        try {

            for (let index = 0; index < favoriteBook.length; index++) {

                if (favoriteBook[index].book === book["@id"]) {
                    setFavoriteBookId(favoriteBook[index]["@id"].split("/")[3])
                    return true
                }
            }
            return false
        }
        catch (error) {
            console.error(error)
        }

    }

    const controllFavorite = async () => {
        setIsInterchangeable(book.isInterchangeable)
       
        if (isFavorite) {

            try {
                console.log(favoriteBookId)
                await apiFavoriteBooksIdDelete(favoriteBookId)
                setIsFavorite(!isFavorite)

            } catch (error) {
                console.error(error)
            }
        }
        else {
            try {

                console.log(book["@id"])
                console.log("api/user/" + currentUser.id)
                await apiFavoriteBooksPost({ book: book["@id"], user: "api/users/" + currentUser.id })
                setIsFavorite(!isFavorite)

            } catch (error) {
                console.log(error)
            }
        }

        apiMe()

    }

    return (

        <View style={styles.container}>
<ThemedText type="title">{isInterchangeable}</ThemedText>
            <Image
                style={styles.image}
                source={{ uri: `http://192.168.1.24:8000/${imageURI}` }}
                resizeMode="cover"
            />

            <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={2}>{book.name}</Text>
                <Text style={styles.author}>{book.author}</Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${book.price}</Text>
                </View>

                <View style={styles.metaContainer}>
                    <View style={[styles.badge, styles.categoryBadge]}>
                        <Text style={styles.badgeText}>{getCategoryName(book.category)}</Text>
                    </View>
                    <View style={[styles.badge, styles.statusBadge]}>
                        <Text style={styles.badgeText}>{book.isInterchangeable ?
                        <AntDesign name="swap" size={20} color='#d3d3d3'/>
                        :<FontAwesome name="money" size={20} color='#d3d3d3' />}</Text>
                    </View>


                    <Pressable onPressIn={controllFavorite}>
                        {isFavorite ? (
                        <FontAwesome name="heart" size={24} color="#e12866" />
    ) : (
                            <FontAwesome name="heart-o" size={24} color="#d3d3d3" />
                        )}
                    </Pressable>


                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    detailsContainer: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    author: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    priceContainer: {
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2ecc71',
    },
    metaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    categoryBadge: {
        backgroundColor: '#3498db',
    },
    statusBadge: {
        backgroundColor: '#e67e22',
    },
    badgeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '500',
    },
})
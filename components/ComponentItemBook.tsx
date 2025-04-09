import { Image, Text, View } from "react-native"
import { BookJsonldBookRead } from "../api/model"
import { getCategoryName } from "../constants/types"
import { apiMediaObjectsIdGet } from "../api/generated/helloAPIPlatform"
import { useEffect, useState } from "react"



export const ItemBook = ({ book }: { book: BookJsonldBookRead }) => {

    const [imageURI, setImageURI] = useState('')



    useEffect(() => {
        const getImage = async () => {
            console.log(book.image.split("/")[3])
            const image = await apiMediaObjectsIdGet(book.image.split("/")[3])
            console.log(image.contentUrl)
            setImageURI(image.contentUrl)
        }
        getImage()
        
        console.log(imageURI)
    }, [])


    return (
        <View>
            <Text>{book.name}</Text>
            <Text>{book.author}</Text>
            <Text>{book.price}</Text>
            <Text>{getCategoryName(book.category)}</Text>
            <Text>{book.status}</Text>
            <Text>{imageURI}</Text>

            <Image style={{width:25,height:25}} source={{ uri: `http://192.168.99.30:8000/${imageURI}` }}></Image>

        </View>)
}


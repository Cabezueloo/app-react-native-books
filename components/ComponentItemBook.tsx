import { Text, View } from "react-native"
import { BookJsonldBookRead } from "../api/model"
import { getCategoryName } from "../constants/types"



export const ItemBook = ({ book }: { book: BookJsonldBookRead }) => (

    <View>
        <Text>{book.name}</Text>
        <Text>{book.author}</Text>
        <Text>{book.price}</Text>
        <Text>{getCategoryName(book.category)}</Text>
        <Text>{book.status}</Text>

    </View>
)
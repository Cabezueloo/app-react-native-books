import { useEffect, useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { View, Button, StyleSheet, FlatList, StatusBar, ActivityIndicator } from 'react-native'
import { useAuthAndStyle } from '../../../context/Context'
import { apiBooksGetCollection } from '../../../api/generated/helloAPIPlatform'
import { BookJsonldBookRead } from '../../../api/model'
import { ItemBook } from '../../../components/ComponentItemBook'


import { useTranslation } from 'react-i18next'
import { StringConstants } from '../../../configs'
import MultiSelect from 'react-native-multiple-select';






const HomeScreen = () => {
  const { signOut, currentUser, colors } = useAuthAndStyle()
  const [search, setSearch] = useState<string>('')
  const [books, setBooks] = useState<BookJsonldBookRead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<number[]>([])
  const { t } = useTranslation()


  const items = [
    { id: 1, name: t(StringConstants.fiction) },
    { id: 2, name: t(StringConstants.adventure) },
    { id: 3, name: t(StringConstants.mystery) },
    { id: 4, name: t(StringConstants.sci_fiction) }
    // ... other items
  ];


  useEffect(() => {
    const fetchData = async (name: string = "") => {
      try {
        setIsLoading(true)
        const response = await apiBooksGetCollection({ name: name, "category[]": selectedCategory,})
        setBooks(response['hydra:member'])
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])


  return (
    <>
      <SearchBar
        platform="default"
        placeholder="Search books..."
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
        onClear={() => { setSearch('') }}
      />
      <View>

       
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedCategory}
          selectedItems={selectedCategory}
          selectText="Select Categories"
          searchInputPlaceholderText="Search Categories..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#000"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          hideSubmitButton={true}
        />


      </View>



      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (

          <FlatList
            numColumns={2}
            data={books}
            renderItem={({ item }) => <ItemBook book={item} />}
            keyExtractor={(item) => item['@id']}
            contentContainerStyle={{ padding: 16 }}
          />

        )}

        <Button
          color={colors.primary}
          title="Sign out"
          onPress={signOut}
        />
      </View>
    </>
  )
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

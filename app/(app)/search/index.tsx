import { useEffect, useReducer, useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { View, Button, StyleSheet, FlatList, StatusBar, ActivityIndicator, Text } from 'react-native'
import { useAuthAndStyle } from '../../../context/Context'
import { apiBooksGetCollection } from '../../../api/generated/helloAPIPlatform'
import { ApiBooksGetCollectionOrderCreatedAt, ApiBooksGetCollectionOrderPrice, BookJsonldBookRead } from '../../../api/model'
import { ItemBook } from '../../../components/ComponentItemBook'
import { useTranslation } from 'react-i18next'
import { StringConstants } from '../../../configs'
import MultiSelect from 'react-native-multiple-select';
import { Picker } from '@react-native-picker/picker'
import { actionTypes, initialState, reducer } from '../../../constants/Reducer'

const HomeScreen = () => {
  const { currentUser,apiMe, colors } = useAuthAndStyle()
  const [search, setSearch] = useState<string>('')

  type valueType = 'createdAt' | 'price'
  type byType = 'asc' | 'desc'

  const [selectedCategory, setSelectedCategory] = useState<number[]>([])
  const { t } = useTranslation()
  const [selectedOrder, setSelectedOrder] = useState<{ value: valueType; by: byType } | null>(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { books, loading, error, page, isListEnd } = state;

  const items = [
    { id: 1, name: t(StringConstants.fiction) },
    { id: 2, name: t(StringConstants.adventure) },
    { id: 3, name: t(StringConstants.mystery) },
    { id: 4, name: t(StringConstants.sci_fiction) }
    // ... other items
  ];

  const fetchData = async () => {
    
    if (isListEnd) return
    dispatch({ type: actionTypes.API_REQUEST });
    try {

      const response = await apiBooksGetCollection({
        name: search,
        page: page,
        "category[]": selectedCategory,
        ...(selectedOrder && {
          [`order[${selectedOrder.value}]`]: selectedOrder.by as ApiBooksGetCollectionOrderCreatedAt | ApiBooksGetCollectionOrderPrice

        })
      });

      const booksFromResponse: BookJsonldBookRead[] = response['hydra:member'];
      if (booksFromResponse.length === 0) {
        dispatch({ type: actionTypes.API_LIST_END });
      } else {
        dispatch({ type: actionTypes.API_SUCCESS, payload: { books: booksFromResponse } });
      }
    } catch (err) {
      dispatch({ type: actionTypes.API_FAILURE, error: err });
      console.error('Error fetching books:', err);
    }

  }


  useEffect(() => {
    apiMe()
  }, [])


  useEffect(() => {
    
    fetchData()
    
  }, [page])


  const loadMoreBooks = () => {
    if (!loading && !isListEnd) {

      dispatch({ type: actionTypes.SET_PAGE, payload: page + 1 });
    }
  };

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

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
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
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedOrder}
            onValueChange={(itemValue) => setSelectedOrder(itemValue)}
          >
            <Picker.Item label={t(StringConstants.orderBy)} value={null} key={0} />
            <Picker.Item label={t(StringConstants.orderByAscPrice)} value={{ value: 'price', by: 'asc' }} key={1} />
            <Picker.Item label={t(StringConstants.orderByDescPrice)} value={{ value: 'price', by: 'desc' }} key={2} />
            <Picker.Item label={t(StringConstants.orderByMoreOld)} value={{ value: 'createdAt', by: 'asc' }} key={3} />
            <Picker.Item label={t(StringConstants.orderByMoreRecent)} value={{ value: 'createdAt', by: 'desc' }} key={4} />
          </Picker>
        </View>
      </View>
      <Button
          color={colors.primary}
          title="Buscar"
          onPress={() => {
            dispatch({ type: actionTypes.RESET });
            apiMe()
            fetchData()
          }}
        />



      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {loading && page === 1 ? (
          <ActivityIndicator style={{flex:1}} size="large" color={colors.primary} />
        ) : (
          <>
            {error && <Text>Error: {error.message || 'Something went wrong'}</Text>}
            <FlatList
              numColumns={2}
              data={books}  // Use the books from the reducer state
              renderItem={({ item }) => <ItemBook book={item} />}
              keyExtractor={(item) => item['@id']}
              contentContainerStyle={{ padding: 16 }}
              onEndReachedThreshold={0.5}
              onEndReached={loadMoreBooks}
              ListFooterComponent={
                loading && page > 1 ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : null
              }
            />
          </>
        )}

      
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

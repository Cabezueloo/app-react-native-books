import { useEffect, useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Text, Button } from 'react-native';
import { useAuthAndStyle } from '../../../context/Context';
const HomeScreen = () => {

  const { signOut, currentUser, apiMe, isLoading, colors } = useAuthAndStyle()
  const [search,setSearch] = useState<string>('')

  useEffect(() => {
    apiMe()
  }, [])

  console.log("Current user en el search ->", currentUser)
  return (
    <><SearchBar platform='default'
      onBlur={undefined}
      onChangeText={()=> {setSearch}}
      onFocus={undefined}
      value={search} clearIcon={undefined} searchIcon={undefined} loadingProps={undefined} showLoading={false} onClear={undefined} onCancel={undefined} lightTheme={false} round={false} cancelButtonTitle={''} cancelButtonProps={undefined} showCancel={false}></SearchBar>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>

        <Text style={{ color: colors.text }}>Search</Text>


        <Button color={colors.primary} title='Sign out' onPress={signOut} />
      </View></>
  );
};

export default HomeScreen;

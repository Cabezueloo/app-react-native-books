import { Button, Switch,View } from "react-native"
import { useAuthAndStyle } from "../../../context/Context"
import { useTranslation } from "react-i18next"
import { Picker } from '@react-native-picker/picker';

import * as ImagePicker from 'expo-image-picker';
import { StringConstants } from "../../../configs"
import { BookCategory } from "../../../constants/types"
import * as yup from 'yup';
import { useState } from "react";

import { Formik } from "formik"
import CustomTextInput from "../../../components/CustomTextInput"
import { apiBooksPost, apiMediaObjectsPost } from "../../../api/generated/helloAPIPlatform";
import { BookJsonldBookWrite,} from "../../../api/model";

import { toastSuccess } from "../../../utils/toast";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";

const AddBookScreen = () => {

  const { currentUser,colors,apiMe } = useAuthAndStyle()
  const { t } = useTranslation()
  const [isInterchangeable, setIsInterchangeable] = useState<boolean>(false)
  const toggleSwitch = () => { 
  setIsInterchangeable(!isInterchangeable)
};
  const [selectedImage, setSelectedImage] = useState(null);



  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      selectionLimit:1,
      
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    } else {
      alert('Ningúna imagen seleccionada');
    }


  }



  interface FormAddBook {
    name: string,
    author: string,
    price: number | null,
    is_interchangeable: boolean,
    description: string,
    category: BookCategory | null,
    image_book: string
  }



  const formAddBookSchema = yup.object().shape({

    name: yup.string().required('Requerido'),
    author: yup.string().required('Requerido'),
    price: yup
      .number()
      .required('Requerido')
      .min(1, 'Numero positivo'),
    category: yup
      .number()
      .nullable() // allow null in the form state until a valid selection is made
      .required('Requerido'),
    is_interchangeable: yup
      .boolean()
      .required(''),
    description: yup.string().required('Requerido'),



  });


  const onSubmit = async (values: FormAddBook) => {

    // Call API endpoint
    try {
      
      const file = {
        uri: selectedImage.uri,
        name: selectedImage.fileName || 'image.jpg', // Fallback filename if unavailable
        type: selectedImage.mimeType || 'image/jpeg', // Fallback MIME type
      };
          
      const resImage = await apiMediaObjectsPost({ file: file as unknown as Blob, // Type assertion to satisfy the Blob type
      });

      const data: BookJsonldBookWrite = {
        name: values.name,
        author: values.author,
        price: parseFloat(values.price+""),
        category: values.category,
        isInterchangeable: values.is_interchangeable,
        ubicatedIn: 0,
        description: values.description,
        status: "Available",
        ownerId: currentUser.id,
        image: resImage["@id"]
      }

      await apiBooksPost(data)
      
      //router.navigate(ROUTES.PAGE_SEARCH)
      await apiMe()
      toastSuccess("Subido");

    } catch (error) {
      console.log(error)
    }

  }


  return (



      <ThemedView type="container">

      <ThemedText type="title">{t(StringConstants.title_add)}</ThemedText>

      <Formik
        initialValues={{
          name: '',
          author: '',
          price: null,
          is_interchangeable: false,
          description: '',
          category: null,
          image_book: '',
        }}
        validationSchema={formAddBookSchema}
        onSubmit={onSubmit}

      >
        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <CustomTextInput
                autoComplete="name"
                placeholder={t(StringConstants.name_book)}
                value={values.name}
                placeholderTextColor={colors.text}
                style={{ color: colors.text, marginRight: 15 }}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={errors.name}
                errorStyle={{ color: colors.warning }}
              />
              <CustomTextInput
                placeholder={t(StringConstants.author)}
                value={values.author}
                placeholderTextColor={colors.text}
                style={{ color: colors.text }}
                onChangeText={handleChange('author')}
                onBlur={handleBlur('author')}
                error={errors.author}
                errorStyle={{ color: colors.warning }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <CustomTextInput
                autoComplete="cc-number"
                placeholder={t(StringConstants.price)}
                value={null}
                keyboardType="number-pad"
                placeholderTextColor={colors.text}
                style={{ color: colors.text, marginRight: 15 }}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                error={errors.price}
                errorStyle={{ color: colors.warning }}
              />
              <Switch
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={isInterchangeable ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isInterchangeable}
              />



            </View>

            <CustomTextInput

              placeholder={t(StringConstants.description)}
              value={values.description}
              placeholderTextColor={colors.text}
              style={{ color: colors.text, marginRight: 15 }}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={errors.description}
              errorStyle={{ color: colors.warning }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <Picker

                style={{ alignItems: "center", width: 150 }}
                selectedValue={values.category}
                onValueChange={(itemValue) => {
                  // Directly update the Formik value for category
                  setFieldValue('category', itemValue);
                }}
                mode="dropdown"

              >
                <Picker.Item label={t(StringConstants.select_category)} value={null} key={0} />
                <Picker.Item label={t(StringConstants.fiction)} value={1} key={1} />
                <Picker.Item label={t(StringConstants.adventure)} value={2} key={2} />
                <Picker.Item label={t(StringConstants.mystery)} value={3} key={3} />
                <Picker.Item label={t(StringConstants.sci_fiction)} value={4} key={4} />
              </Picker>


              <Button title="Elige imágen " onPress={() => pickImageAsync()} />




            </View>
           
            <Button title="Subir" onPress={() => handleSubmit()} />


          </>


        )}


      </Formik>










      </ThemedView>  )

}
export default AddBookScreen;
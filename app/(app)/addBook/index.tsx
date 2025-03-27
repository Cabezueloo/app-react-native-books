import { Button, Switch, Text, TextInput, View } from "react-native"
import { useAuthAndStyle } from "../../../context/Context"
import { useTranslation } from "react-i18next"
import { Picker } from '@react-native-picker/picker';


import { StringConstants } from "../../../configs"
import { BookCategory } from "../../../constants/types"
import * as yup from 'yup';
import { useState } from "react";

import { Formik } from "formik"
import CustomTextInput from "../../../components/CustomTextInput"

const AddBookScreen = () => {

  const { currentUser, isLoading, colors } = useAuthAndStyle()
  const { t } = useTranslation()
  const [fieldValue, setFieldValue] = useState();

  const [isInterchangeable, setIsInterchangeable] = useState(false);
  const toggleSwitch = () => setIsInterchangeable(previousState => !previousState);


  interface FormAddBook {
    name: string,
    author: string,
    price: number,
    is_interchangeable: boolean,
    description: string,
    category: BookCategory,
    image_book: any
  }



  const formAddBookSchema = yup.object().shape({

    name: yup.string().required('Book name is required'),
    author: yup.string().required('Author is required'),
    price: yup
      .number()
      .required('Price is required')
      .min(0, 'Price must be a positive number'),
    is_interchangeable: yup
      .boolean()
      .required('Interchangeability must be specified'),
    description: yup.string().required('Description is required'),
    category: yup.mixed().required('Category is required'),
    image_book: yup.mixed().required('Book image is required'),

  });

  const onSubmit = (values: FormAddBook) => {

    console.log("Entro")
  }


  return (


    <View style={{ flex: 1, alignItems: 'center', backgroundColor: colors.background, padding: 30 }}>

      <Text style={{ color: colors.text }}>{t(StringConstants.title_add)}</Text>

      <Formik
        initialValues={{
          name: '',
          author: '',
          price: 0,
          is_interchangeable: false,
          description: '',
          category: null,
          image_book: '',
        }}
        validationSchema={formAddBookSchema}
        onSubmit={onSubmit}

      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                value={values.price.toString()}
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
                selectedValue={fieldValue}
                style={{ alignItems: "center", width: 150 }}
                onValueChange={(itemValue) => setFieldValue(itemValue)}
                placeholder={t(StringConstants.select_category)}
                mode="dropdown"
                
              >
                <Picker.Item label={t(StringConstants.fiction)} value={1} />
                <Picker.Item label={t(StringConstants.adventure)} value={2} />
                <Picker.Item label={t(StringConstants.mystery)} value={3} />
                <Picker.Item label={t(StringConstants.sci_fiction)} value={3} />
              </Picker>

              <TextInput>TODO IMAGE</TextInput>



            </View>
          
            <Button title="Subir" onPress={() => handleSubmit()} />


          </>


        )}


      </Formik>










    </View>
  )

}
export default AddBookScreen
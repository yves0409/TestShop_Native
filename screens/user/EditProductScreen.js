import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [priceIsValid, setPriceIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert("Invalid title", "Please enter a title!", [{ text: "OK" }]);
      return;
    }

    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.naviation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const titleChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }
    setTitle();
  };

  const descriptionChangeHandler = (description) => {
    if (description.trim().length === 0) {
      setDescriptionIsValid(false);
    } else {
      setDescriptionIsValid(true);
    }
    setDescription();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
          />
          {!titleIsValid && <Text>Please enter a title!</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            returnKeyType="done"
          ></TextInput>
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="decimal-pad"
            ></TextInput>
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={descriptionChangeHandler}
            returnKeyType="go"
          />
          {!descriptionIsValid && <Text>Please enter a description!</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;

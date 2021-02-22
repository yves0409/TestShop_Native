// import React from "react";
// import { useSelector } from "react-redux";
// import { FlatList, Platform } from "react-native";
// import ProductItem from "../../components/shop/ProductItem";
// import HeaderButton from "../../components/UI/HeaderButton";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";

// const UserProductsScreen = (props) => {
//   const userProducts = useSelector((state) => state.products.userProducts); //products refers to identifier in App.js,userProducts refers to identifier in produt reducer
//   return (
//     <FlatList
//       data={userProducts}
//       keyExtractor={(item) => item.id}
//       renderItem={(itemData) => (
//         <ProductItem
//           image={itemData.item.imageUrl}
//           title={itemData.item.title}
//           price={itemData.item.price}
//           onViewDetail={() => {}}
//           onAddToCart={() => {}}
//         />
//       )}
//     />
//   );
// };

// UserProductsScreen.navigationOptions = (navData) => {
//   return {
//     headerTitle: "My Products",
//     headerLeft: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

// export default UserProductsScreen;

import React from "react";
import { FlatList, Button, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button color={Colors.primary} title="Edit" onPress={() => {}} />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productsActions.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/actions/meals';

const FilterSwitch = (props) => (
  <View style={styles.filterContainer}>
    <Text style={{ fontSize: 20, fontFamily: 'primary' }}>{props.label}</Text>
    <Switch
      value={props.value}
      onValueChange={props.onChange}
      trackColor={{ true: Colors.primaryColor }}
      thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
    />
  </View>
);

const FilterScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);

  const dispatch = useDispatch();

  const setFilterHandler = useCallback(() => {
    dispatch(
      setFilter({
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vegan: isVegan,
        vegetarian: isVegeterian,
      })
    );
  }, [isGlutenFree, isLactoseFree, isVegeterian, isVegan, dispatch]);

  useEffect(() => {
    props.navigation.setParams({ saveFilter: setFilterHandler });
  }, [setFilterHandler]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label='Gluten-free'
        value={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label='Lactose-free'
        value={isLactoseFree}
        onChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label='Vegan'
        value={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        label='Vegeterian'
        value={isVegeterian}
        onChange={(newValue) => setIsVegeterian(newValue)}
      />
    </View>
  );
};

FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filter',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName='ios-menu'
          iconSize={24}
          title='menu'
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName='ios-save'
          iconSize={24}
          title='save'
          onPress={navData.navigation.getParam('saveFilter')}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'primary',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
});

export default FilterScreen;

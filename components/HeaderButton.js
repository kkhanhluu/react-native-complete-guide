import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Platform, StyleSheet } from 'react-native';

const CustomHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
  />
);

const styles = StyleSheet.create({});

export default CustomHeaderButton;

import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#308ABD',
    width: '80%',
    height: 50,
    margin: 20,
    elevation: 5,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

const DeleteAll = ({onPressOut, id}) => {
    console.log (onPressOut);
    console.log (id);
    return(
        <Pressable
          style={styles.pressable} 
        //   onPressOut={_onPressOut}
        >
          <Text style={styles.text}>
            완료항목 전체삭제
          </Text>
        </Pressable>
    )
};

export default DeleteAll;


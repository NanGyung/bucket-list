import React from 'react'
import { Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';


const DeleteButton = ({onPressOut, id}) => {
    console.log(onPressOut,id);
    console.log(_onPressOut);

    const _onPressOut = () => {
        onPressOut(id);
    };

    return (
        <TouchableOpacity 
          style={styles.pressable} 
          onPressOut={_onPressOut}
          completed= {false}
        >
          <Text style={styles.text}>
            완료항목 전체삭제
          </Text>
        </TouchableOpacity>
    )
};

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

// DeleteButton.defaultProps = {
//     onPressOut: () => {},
// };

DeleteButton.propTypes = {
    onPressOut: PropTypes.func,
    id: PropTypes.string,
    completed: PropTypes.bool
};

export default DeleteButton;
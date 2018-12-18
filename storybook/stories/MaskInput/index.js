import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from "react-native-masked-text";
import { Input } from "react-native-elements";


export default function CenterView({ children }) {
    return (
        <View>


            <TextInputMask 
                style={styles.input}
                type="money"
                options={{ separator: '.', delimiter: ',', unit: '' }}
            />
            <Input>
                
            </Input>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 50, 
        margin: 15,
        height: 40,
        // width: 100,
        justifyContent: 'center',
        fontSize: 36,
        // alignSelf: 'center',
        borderWidth: 0.5,
        color: '#909ca6',
    }
});



import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from "react-native-elements";


export default function CenterView({ children }) {
    return (
        <View style={style.container}>
            <Input
                style={style.input}
                label={'Description'}
                ref={ref => this.textInput = ref}
            />
            <Button
                style={{ marginTop: 15, borderColor: 'red' , borderWidth: 1}}
                onPress={() =>
                    this.textInput.shake()
                }
                title="Test"
            />
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        borderColor: 'red',
        borderWidth: 1,
        
    }

}

)
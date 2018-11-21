import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput, Button, FormLabel } from "react-native-elements";


export default function CenterView({ children }) {
    return (
        <View>
            <FormLabel>Description</FormLabel>
            <FormInput
                ref={ref => this.textInput = ref}
            />
            <Button
                style={{ marginTop: 15 }}
                onPress={() =>
                    this.textInput.shake()
                }
                title="Test"
            />
        </View>

    )
}


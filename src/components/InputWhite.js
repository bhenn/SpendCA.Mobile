import React, { Component } from "react";
import { Input, Icon } from 'react-native-elements'


class InputWhite extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Input
                {...this.props}
                leftIcon={
                    <Icon
                        type='feather'
                        name={this.props.iconName}
                        color='rgba(255, 255, 255, 0.7)'
                    />
                }
                inputContainerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderBottomWidth: 0, marginBottom: 2 }}
                inputStyle={{ color: 'white' }}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            ></Input>
        )
    }
}

export default InputWhite
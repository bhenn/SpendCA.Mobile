import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem, Header, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { gastosFetch } from "../actions/SpendActions";
import NavigationService from "../../NavigationService";
import moment from 'moment'


class MyListItem extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.line}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.month}>{moment(this.props.date).format('MMM')}</Text>
                        <Text style={styles.day}>{moment(this.props.date).format('DD')}</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <Text style={styles.category}>{this.props.category}</Text>
                        <Text style={styles.description}>{this.props.title}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.amount}>{this.props.value}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class MyListItemCategory extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity>
                <View style={{backgroundColor: 'white', width: 70, height: 70,  margin: 3, padding: 4}}>
                    <View style={{flex: 1}}>
                        <Text>{this.props.category}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>{this.props.sum}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Overview",
        headerStyle: {
            backgroundColor: "#b2dbbf"
        },
        headerRight: (
            <View
                style={{ width: 35, alignContent: "center", marginRight: 20 }}
            >
                <TouchableOpacity
                    onPress={() => NavigationService.navigate("SpendAdd")}
                >
                    <Icon name="add" fontSize="20" style={{ marginRight: 5 }} />
                </TouchableOpacity>
            </View>
        )
    };

    componentWillMount() {
        this.props.gastosFetch();
    }

    _renderItem({ item }) {
        return (
            <MyListItem
                title={item.description}
                category={item.category}
                value={item.value}
                date={item.date}
            />
        );
    }

    _renderItemCategory({ item }) {
        return (
            <MyListItemCategory
                category={item.category}
                sum={item.sum}
            />
        );
    }

    render() {
        return (
            <View>
                <View>
                    <FlatList
                        data={this.props.categories}
                        renderItem={this._renderItemCategory}
                        contentContainerStyle={{flexDirection: 'row'}}
                        keyExtractor={item => item.category}
                    />
                </View>
                <View>
                    <FlatList
                        renderItem={this._renderItem}
                        data={this.props.spends}
                        keyExtractor={item => item.uid}
                    />
                </View>
            </View>
        );
    }
}

mapStateToProps = state => ({
    spends: state.SpendListReducer.spends,
    categories: state.SpendListReducer.categories,
});

const styles = StyleSheet.create({
    line: {
        padding: 8,
        margin: 1,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white'
    },
    category: {
        fontSize: 18,
    },
    description: {
        color: '#999',
    },
    amount: {
        fontSize: 16,
        textAlign: 'right'
    },
    month: {
        color: '#999',
        textAlign: 'center',
    },
    day: {
        color: '#999',
        textAlign: 'center',
    }
})

export default connect(
    mapStateToProps,
    { gastosFetch }
)(HomeScreen);

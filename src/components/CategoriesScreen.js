import React from "react";
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { Icon, ListItem, Button } from "react-native-elements";
import { connect } from "react-redux";
import { categoryFetch } from "../actions/CategoryActions";
import NavigationService from "../../NavigationService";
import firebase from 'firebase'

class MyListItem extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity>
                <View>
                    <View style={{ flex: 1 }}>
                        <Text>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: "SETTINGS",
        headerStyle: {
            backgroundColor: "#b2dbbf"
        },
        headerRight: (
            <View
                style={{ width: 35, alignContent: "center", marginRight: 20 }}
            >
                <TouchableOpacity
                    onPress={() => NavigationService.navigate("CategoryAdd")}
                >
                    <Icon name="add" fontSize="20" style={{ marginRight: 5 }} />
                </TouchableOpacity>
            </View>
        )
    };

    componentWillMount() {
        this.props.categoryFetch();
    }

    _renderItem({ item }) {
        return <ListItem title={item.description} />;
    }

    _logout(){
        firebase.auth().signOut()
    }

    render() {
        return (
            <View>
                <View>
                    <FlatList
                        renderItem={this._renderItem}
                        data={this.props.categories}
                    />
                </View>
                <View>
                    <Button
                        onPress={() => this._logout()}
                        title="Logout"
                    />
                </View>
            </View>
        );
    }
}

mapStateToProps = state => ({
    categories: state.CategoryListReducer.categories
});

const styles = StyleSheet.create({});

export default connect(
    mapStateToProps,
    { categoryFetch }
)(SettingsScreen);

import React from 'react';
import {Image, Text, TouchableOpacity} from "react-native";
import {Appbar, useTheme} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NativeStackNavigationOptions, NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamListBase, Route, useNavigation} from "@react-navigation/native";
import {useAppSelector} from "../../store/hooks";

type HeaderProps = {
    navigation:  NativeStackNavigationProp<ParamListBase>;
    route:  Route<string>;
    options: NativeStackNavigationOptions;
    back: {title: string} | undefined;
}

const Header : React.FC<HeaderProps>  = ({ navigation, route, options, back }) => {
    const theme = useTheme()
    const title =
        options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
                ? options.title
                : route.name;
    const headerTitle = title as string | JSX.Element

    return (
        <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
            {back && (
                <Appbar.BackAction
                    onPress={() => navigation.pop()}
                    color={theme.colors.primary}
                />
                )}
            <Appbar.Content
                title={
                    back ? headerTitle : <MaterialCommunityIcons name="twitter" size={40} />
                }
            />
        </Appbar.Header>
    );
};

export const LogoTitle: React.FC = () => {
    return (
        <Image
            style={{ height: 30, width: 80 }}
            source={require('../../assets/images/logo-transparent.png')}
        />
    );
}

export const AccountIcon: React.FC = () => {
    const username = useAppSelector(state => state.users.current?.username)
    const theme = useTheme()
    const navigation = useNavigation()



    return (
        <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}
                          onPress={() => navigation.openDrawer()}

        >
            <MaterialCommunityIcons name={"account-circle"} color={theme.colors.text} size={30}/>
            <Text style={{color: theme.colors.text, paddingLeft: 5}}>{username}</Text>
        </TouchableOpacity>
    );
}


export default Header
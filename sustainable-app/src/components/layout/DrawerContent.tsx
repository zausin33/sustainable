import {SafeAreaView, ScrollView, View, StyleSheet} from "react-native";
import {Caption, Drawer, Paragraph, Switch, Title, TouchableRipple, Text, useTheme} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import React from "react";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import { Avatar } from "react-native-paper";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {toggle} from "../../store/theme/theme.slice";
import {logout} from "../../store/users/users.slice";

const SettingsDrawerContent: React.FC = (props: any) => {
    const navigation = useNavigation()
    const theme = useTheme()
    const user = useAppSelector(state => state.user)
    const isDarkMode = useAppSelector(state => state.theme.isDark)
    const dispatch = useAppDispatch()

    const toggleDarkMode = () => {
        dispatch(toggle())
    }

    const performLogout = () => {
        dispatch(logout())
    }

    return (
        <DrawerContentScrollView {...props}>
            <View
                style={styles.drawerContent}
            >
                <View style={styles.userInfoSection}>
                    <MaterialCommunityIcons name={"account-circle"} color={theme.colors.placeholder} size={55}/>
                    <Title style={styles.title}>{user.username}</Title>
                    <Caption style={styles.caption}>{user.email}</Caption>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                202
                            </Paragraph>
                            <Caption style={styles.caption}>Following</Caption>
                        </View>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                159
                            </Paragraph>
                            <Caption style={styles.caption}>Followers</Caption>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Profile"
                        onPress={() => {}}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="tune" color={color} size={size} />
                        )}
                        label="Preferences"
                        onPress={() => {}}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="bookmark-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Bookmarks"
                        onPress={() => {}}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={toggleDarkMode}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={isDarkMode} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
                <Drawer.Section>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="logout"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Logout"
                        onPress={performLogout}
                    />
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default SettingsDrawerContent
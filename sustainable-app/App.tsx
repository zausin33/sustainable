import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import RootNavigator from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import {persistor, store} from "./src/store/store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import defaultTheme from "./src/styles/defaultTheme";
import {Appearance, Text} from "react-native";
import {useAppDispatch, useAppSelector} from "./src/store/hooks";
import {setTheme} from "./src/store/theme/theme.slice";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate loading={<Text>Persistor is Loading</Text>} persistor={persistor}>
                    <ThemeProviders />
                </PersistGate>
            </Provider>
        );
    }
}

const ThemeProviders: React.FC = () => {
    const dispatch = useAppDispatch()
    const isDark = useAppSelector(state => state.theme.isDark);
    const theme = defaultTheme(isDark)

    Appearance.addChangeListener(() => {
        dispatch(setTheme({isDark: Appearance.getColorScheme() === "dark"}))
    })

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <RootNavigator/>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    )
}

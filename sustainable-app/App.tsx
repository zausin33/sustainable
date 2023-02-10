import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
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
import Toast from 'react-native-toast-message';
import {getToastConfig} from "./src/utils/toast";
import {
    de,
    enGB,
    registerTranslation,
} from 'react-native-paper-dates'
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";

if (Platform.OS === "android") {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === "function") {
        (Intl as any).__disableRegExpRestore();
    }
}

registerTranslation('de', de)

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
    const toastConfig = getToastConfig(theme);

    Appearance.addChangeListener(() => {
        dispatch(setTheme({isDark: Appearance.getColorScheme() === "dark"}))
    })

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <RootNavigator/>
                    <Toast position="bottom" visibilityTime={3000} config={toastConfig} />
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    )
}

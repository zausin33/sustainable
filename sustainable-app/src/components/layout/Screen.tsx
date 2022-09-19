import * as React from 'react';
import {
    Image,
    ImageBackground,
    ImageStyle,
    LayoutChangeEvent,
    Platform,
    SafeAreaView,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {ConditionalWrapper} from '../core/ConditionalWrapper';
import {LinearGradient} from 'expo-linear-gradient';
import useScreen from "../../styles/components/layout/screen";
import {useAppSelector} from "../../store/hooks";

interface ScreenProps {
  imageSource?: Image;
  imageStyle?: StyleProp<ImageStyle>;
  imageBackgroundStyle?: StyleProp<ViewStyle>;
  backgroundStyle?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
  keyBoardAwareStyle?: StyleProp<ViewStyle>;
  keyBoardAwareContentContainerStyle?: StyleProp<ViewStyle>;
  isLinearGradient?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  enableAndroidSaveArea?: boolean;
  isScrollView?: boolean;
  colorTransitionLayout?: (event: LayoutChangeEvent) => void;
  children: JSX.Element;
}

const Screen: React.FC<ScreenProps> = ({
  imageSource,
  imageStyle,
  imageBackgroundStyle,
  backgroundStyle,
  safeAreaStyle,
  keyBoardAwareStyle,
  keyBoardAwareContentContainerStyle,
  isLinearGradient = false,
  onLayout = () => {},
  enableAndroidSaveArea = false,
  isScrollView = true,
  children,
}) => {
  const isDark = useAppSelector(state => state.theme.isDark);
  const screen = useScreen();

  return (
    <View style={[screen.background, backgroundStyle]}>
      <ConditionalWrapper
        condition={imageSource}
        wrapper={(children, condition) => {
          const image = Image.resolveAssetSource(condition);
          const ratio = image.width / image.height;
          return (
            <ImageBackground
              style={[screen.imageBackground, imageBackgroundStyle]}
              source={condition}
              imageStyle={[
                screen.imageStyle,
                { aspectRatio: ratio },
                imageStyle,
              ]}
            >
              {children}
            </ImageBackground>
          );
        }}
      >
        <SafeAreaView
          onLayout={(event) => onLayout(event)}
          style={[
            Platform.OS === 'android' && enableAndroidSaveArea
              ? screen.androidSafeArea
              : {},
            screen.scrollViewContainer,
            safeAreaStyle,
          ]}
        >
          <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={screen.statusBar.backgroundColor}/>
          {isLinearGradient && (
            <LinearGradient
              colors={['#97CADB', '#01BABE', '#D6EBEE']}
              locations={[0, 0.35, 1]}
              start={{ x: 0, y: 0.1 }}
              end={{ x: 1, y: 0.45 }}
              style={screen.linearGradient}
            />
          )}
            {isScrollView ? (
                <KeyboardAwareScrollView
                    style={[screen.scrollView, keyBoardAwareStyle]}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        screen.scrollViewContainer,
                        keyBoardAwareContentContainerStyle,
                    ]}
                >
                    {children}
                </KeyboardAwareScrollView>
            ) : (
                <View style={[screen.scrollView, screen.scrollViewContainer]}>
                    {children}
                </View>
            )}
        </SafeAreaView>
      </ConditionalWrapper>
    </View>
  );
};

export default Screen;
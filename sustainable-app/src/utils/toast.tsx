import Toast, {
  BaseToast,
  BaseToastProps,
  InfoToast,
  ErrorToast,
} from 'react-native-toast-message';
import React from 'react';

export const showErrorMsg = (msg: string, title = "Fehler") => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: msg,
  });
};

export const showInfoMsg = (msg: string, title = "Info") => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: msg,
  });
};

export const showSuccessMsg = (msg: string, title = "Erfolg") => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: msg,
  });
};
export const getToastConfig = (theme: ReactNativePaper.Theme) => {
  const style = {
    borderRadius: theme.roundness,
    marginHorizontal: 16,
    borderLeftWidth: 0,
    width: 'auto',
  };
  const borderLeftWidth = 8;
  return {
    success: (props: BaseToastProps) => {
      return (
        <BaseToast
          {...props}
          style={[
            style,
            {
              borderLeftColor: theme.colors.success,
            },
          ]}
          contentContainerStyle={{
            backgroundColor: theme.colors.success + 'BB',
            borderLeftColor: theme.colors.success,
            borderLeftWidth: borderLeftWidth,
            borderRadius: theme.roundness,
          }}
          text1Style={{
            color: theme.colors.text,
          }}
          text2Style={{
            color: theme.colors.text,
          }}
        />
      );
    },
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={[
          style,
          {
            borderLeftColor: theme.colors.error,
          },
        ]}
        contentContainerStyle={{
          backgroundColor: theme.colors.error + 'BB',
          borderLeftColor: theme.colors.error,
          borderLeftWidth: borderLeftWidth,
          borderRadius: theme.roundness,
        }}
        text1Style={{
          color: theme.colors.text,
        }}
        text2Style={{
          color: theme.colors.text,
        }}
      />
    ),
    info: (props: BaseToastProps) => (
      <InfoToast
        {...props}
        style={[
          style,
          {
            borderLeftColor: theme.colors.info,
          },
        ]}
        contentContainerStyle={{
          backgroundColor: theme.colors.info + 'BB',
          borderLeftColor: theme.colors.info,
          borderLeftWidth: borderLeftWidth,
          borderRadius: theme.roundness,
        }}
        text1Style={{
          color: theme.colors.text,
        }}
        text2Style={{
          color: theme.colors.text,
        }}
      />
    ),
  };
};

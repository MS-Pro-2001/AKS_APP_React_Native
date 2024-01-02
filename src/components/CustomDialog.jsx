import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Provider as PaperProvider, Text, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#2d3436',
        accent: '#1C1C1C',
        background: '#636e72'
    }
};
const CustomDialog = () => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <PaperProvider theme={theme}>
            <View>
                {/* <Button onPress={showDialog}>Show Dialog</Button> */}
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">This is simple dialog</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    )
}

export default CustomDialog
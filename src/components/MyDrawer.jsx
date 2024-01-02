import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'react-native-paper'

const MyDrawer = () => {
    return (
        <Drawer.CollapsedItem
            {...props}
            focusedIcon="inbox"
            unfocusedIcon="inbox-outline"
            label="Inbox"
        />
    )
}

export default MyDrawer
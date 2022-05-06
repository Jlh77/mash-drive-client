import React, { Component } from 'react'
import { View, Image } from 'react-native'

const ImagesExample = () => (
    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
   <Image source = {require('../img/mash-drive.png')}
   style = {{ width: 500, height: 300 }}
   />
   </View>
)


export default ImagesExample



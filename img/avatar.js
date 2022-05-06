import React, { Component } from 'react'
import { View, Image } from 'react-native'


const DefaultAvatar = () => (
    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
   <Image source = {require('../img/default_avatar.jpeg')}
   style = {{ width: 100, height: 100, borderRadius: 1000}}
   />
   </View>
)

const DefaultImg = () => (
    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
    <Image source = {require('../img/defaultImage.jpeg')}
    style = {{ width: 100, height: 100 }}
    />
    </View>  
)

export {DefaultAvatar, DefaultImg}
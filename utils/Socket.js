import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground} from 'react-native'; 
import  io  from 'socket.io-client';
import React, { Component } from 'react';


export default class Messages extends Component{
    componentDidMount() {
        const socket = io('http://192.168.1.217:3000');
        socket.on("message", (data) => {
            console.log(data);
            socket.emit("another event", { james: "I am Great"});
        })
    }

    render(){
        return (
            <></>
          );
    }
    
  }


  
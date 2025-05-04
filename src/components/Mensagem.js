import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Mensagem = ({text, sender, isUser}) => {
    return (
        <View style={[styles.container, isUser ? styles.userMessage : styles.otherMessage]}>
            <Text style={styles.sender}>{sender}</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 8,
        maxWidth: '70%'
    },
    userMessage: {
        backgroundColor: '#1d4ed8',
        alignSelf: 'flex-end'
    },
    chatMessage: {
        backgroundColor: '#f1f5f9',
        alignSelf: 'flex-start'
    },
    sender: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    text: {
        color: '#ffffff'
    }
});


export default Mensagem;

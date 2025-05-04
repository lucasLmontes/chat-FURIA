import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import Mensagem from "../components/Mensagem";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";


const TelaChat = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const pararAtualizacao = onSnapshot(collection(db, 'mensagens'), (snapshot) => {
            const mensagensCarregadas = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            setMessages(mensagensCarregadas);
        });
        return() => pararAtualizacao();
    }, []);

    const gerarRespostaBot = (mensagemRecebida) => {
        const respostaPadrao = "Olá! Seja bem vindo ao mobile chat da equipe de CS da FURIA!"
        return{
            text: respostaPadrao,
            sender: 'FURIAbot',
            timestamp: Date.now()
        };
    };

    const enviarMensagem = async () => {
        if(text.trim() === '') return;

        const mensagemUsuario = {
            text: text,
            sender: 'Usuário',
            timestamp: Date.now()
        }

        await addDoc(collection(db, 'mensagens'), mensagemUsuario);
        setText('');

        setTimeout(async () => {
            const respostaBot = gerarRespostaBot(mensagemUsuario);
            await addDoc(collection(db, 'mensagens'), respostaBot);
        }, 1000)
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages.sort((a, b) => a.timestamp - b.timestamp)}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Mensagem text={item.text} sender={item.sender} isUser={item.sender === 'Usuário'} />
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Digite uma mensagem" />
                <Button title="Enviar" onPress={enviarMensagem} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginRight: 5
    }
});

export default TelaChat

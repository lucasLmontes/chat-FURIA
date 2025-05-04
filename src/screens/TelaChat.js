import { useEffect } from "react";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import Mensagem from "../components/Mensagem";


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

    const enviarMensagem = async () => {
        if(text.trim() === '') return;
        await addDoc(collection(db, 'mensagens'), {text, sender: 'Usuário', timestamp: Date.now()});
        setText('');
    };
};
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { apiMessagesGetCollection, apiMessagesPost } from '../../../api/generated/helloAPIPlatform';
import { useAuthAndStyle } from '../../../context/Context';
import { ThemedView } from '../../../components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';

const ChatScreen = () => {
  const { bookId, reciver } = useLocalSearchParams();

  const bookIdNum = parseInt((bookId as string).split('/').pop()!);
  const reciverNum = parseInt((reciver as string).split('/').pop()!);
  const { currentUser } = useAuthAndStyle();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const fetchMessages = useCallback(async () => {
    try {
      //Lo hago así porque es la manera más fácil, debería de modificar la base de datos o hacer más llamadas a la API
      const res = await apiMessagesGetCollection({
        'sender.id': currentUser.id,
        'fromBook.id': bookIdNum,
        'receiver.id': reciverNum,        
      });

      const resD = await apiMessagesGetCollection({
        'sender.id': reciverNum,
        'fromBook.id': bookIdNum,
        'receiver.id': currentUser.id,
      });
      const msg = [...res["hydra:member"],...resD["hydra:member"]]
      //Order by date
      const sortedArray: { createdAt?: string; }[] = msg.sort((n1,n2) => {
        if (n1.createdAt > n2.createdAt) {
            return 1;
        }
    
        if (n1.createdAt < n2.createdAt) {
            return -1;
        }
    
        return 0;
    });
    
      setMessages(sortedArray)
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  }, [bookIdNum, reciverNum, currentUser.id]);

  useEffect(() => {
    fetchMessages();

    //Each 10s check messagess
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const sendMessage = async () => {
  
    if (!text.trim()) return;
    try {
      await apiMessagesPost({
        text,
        sender: `/api/users/${currentUser.id}`,
        receiver: `/api/users/${reciverNum}`,
        fromBook: `/api/books/${bookIdNum}`,
      });
      setText('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender === currentUser.id || item.sender.includes(`users/${currentUser.id}`);
    return (
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
        <ThemedText type='default'>{item.text}</ThemedText>
        <Text style={styles.timeText}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
      </View>
    );
  };

  return (
    <ThemedView type='containerItems'    
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Escribe un mensaje"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: '#fff', fontWeight: 'bold'}}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 16 },
  bubble: { marginVertical: 4, padding: 8, borderRadius: 8, maxWidth: '75%' },
  myBubble: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  theirBubble: { backgroundColor: '#ECECEC', alignSelf: 'flex-start' },
  messageText: { fontSize: 16 },
  timeText: { fontSize: 10, color: '#888', marginTop: 4, textAlign: 'right' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 8, borderTopWidth: 1, borderColor: '#ddd' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
  sendButton: { backgroundColor: '#2196F3', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10 },
});

export default ChatScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { apiMessagesGetCollection, apiMessagesPost } from '../../../api/generated/helloAPIPlatform';
import { useAuthAndStyle } from '../../../context/Context';

const ChatScreen = () => {
  const { bookId, reciver } = useLocalSearchParams();
  // extract numeric IDs from path params
  const bookIdNum = parseInt((bookId as string).split('/').pop()!);
  const reciverNum = parseInt((reciver as string).split('/').pop()!);

  const { currentUser } = useAuthAndStyle();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const fetchMessages = useCallback(async () => {
    try {
      const res = await apiMessagesGetCollection({
        'sender.id': currentUser.id,
        'fromBook.id': bookIdNum,
        'receiver.id': reciverNum,
      });
      setMessages(res['hydra:member']);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  }, [bookIdNum, reciverNum, currentUser.id]);

  useEffect(() => {
    fetchMessages();
    // Optionally: poll every 10 seconds
    const interval = setInterval(fetchMessages, 10000);
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
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
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
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  sendText: { color: '#fff', fontWeight: 'bold' },
});

export default ChatScreen;

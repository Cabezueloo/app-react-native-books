import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthAndStyle } from '../../../context/Context';
import { apiMessagesGetCollection } from '../../../api/generated/helloAPIPlatform';

interface Conversation {
  bookUri: string;
  bookId: number;
  senderUri: string;
}

const HomeMessagesScreen = () => {
  const { currentUser, colors } = useAuthAndStyle();
  const router = useRouter();

  // Map user.books URIs to numeric IDs
  const myBooksId: number[] = currentUser.books.map((b) => parseInt(b.split('/').pop()!, 10));

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiMessagesGetCollection({
        'fromBook.id[]': myBooksId,
        'receiver.id': currentUser.id,
      });
      const msgs = res['hydra:member'];

      // Group messages by fromBook URI, keep only one entry per book
      const grouped: Record<string, string> = {};
      msgs.forEach((msg: { fromBook: string; sender: string }) => {

        console.log(msg)
        const bookUri = msg.fromBook;
        // overwrite or first; we only need one sender per book
        grouped[bookUri] = msg.sender;
      });

      // Build array of conversations
      const convs: Conversation[] = Object.entries(grouped).map(
        ([bookUri, senderUri]) => ({
          bookUri,
          bookId: parseInt(bookUri.split('/').pop()!, 10),
          senderUri,
        })
      );
      console.log(convs)
      setConversations(convs);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  const openChat = (bookId: number, senderUri: string) => {
    const senderId = parseInt(senderUri.split('/').pop()!, 10);
    router.push({
      pathname: 'messages/chat',
      params: { bookId: String(bookId), reciver: String(senderId) },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (conversations.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={[styles.emptyText, { color: colors.text }]}>No messages for your books yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.bookUri}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.row]}
          onPress={() => openChat(item.bookId, item.senderUri)}
        >
          <Text style={[styles.text, { color: colors.text }]}>Boddddddddddok #{item.bookId}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: { padding: 12, borderBottomWidth: 1 },
  text: { fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16 },
});

export default HomeMessagesScreen;

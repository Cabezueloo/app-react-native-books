import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthAndStyle } from '../../../context/Context';
import { apiMessagesGetCollection, apiUsersIdGet } from '../../../api/generated/helloAPIPlatform';
import { UserJsonldUserRead } from '../../../api/model';

interface Conversation {
  bookUri: string;
  bookId: number;
  senderUri: string;
  infoBuyer: UserJsonldUserRead;
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
      const grouped: Record<string, Set<String>> = {};
      msgs.forEach((msg: { fromBook: string; sender: string }) => {

        const bookUri = msg.fromBook;
        if (!grouped[bookUri]) {
          grouped[bookUri] = new Set<string>();
        }

        // add this sender to the Set for that book
        grouped[bookUri].add(msg.sender);
      });

      console.log(grouped)



      // Build array of conversations
      const convPromises: Promise<Conversation>[] = Object.entries(grouped).flatMap(
        ([bookUri, senders]) =>
          Array.from(senders).map(async (senderUri) => {
            const userId = parseInt(senderUri.split('/').pop()!, 10);
            const user = await apiUsersIdGet(String(userId));
            return {
              bookUri,
              bookId: parseInt(bookUri.split('/').pop()!, 10),
              senderUri: String(senderUri),
              infoBuyer: user,
            };
          })
      );

      // Wait for all user fetches to finish
      const convs: Conversation[] = await Promise.all(convPromises);


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
      keyExtractor={(item) => `${item.bookUri}|${item.senderUri}`}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => openChat(item.bookId, item.senderUri)}
        >
          <View>
          <Text style={[styles.username, { color: colors.text }]}>
            {item.infoBuyer.name}
          </Text>
          <Text style={[styles.username, { color: colors.text }]}>
            {item.infoBuyer.surname}
          </Text>

          </View>
          <Text style={[styles.username, { color: colors.text }]}>
            {item.infoBuyer.username}
          </Text>
          <Text style={[styles.bookId, { color: colors.text }]}>
            Book #{item.bookId}
          </Text>
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
  card: {
    backgroundColor: 'white',      // or colors.cardBackground
    borderRadius: 8,               // rounded corners
    padding: 12,                   // inner spacing
    marginBottom: 12,              // spacing between cards
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookId: {
    fontSize: 14,
  },
});

export default HomeMessagesScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthAndStyle } from '../../../context/Context';
import { apiBooksIdGet, apiMessagesGetCollection, apiUsersIdGet } from '../../../api/generated/helloAPIPlatform';
import { BookJsonldBookRead, UserJsonldUserRead } from '../../../api/model';
import { ThemedView } from '../../../components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';

interface Conversation {
  book: BookJsonldBookRead,
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

        grouped[bookUri].add(msg.sender);
      });

      const convPromises: Promise<Conversation>[] = Object.entries(grouped).flatMap(

        ([bookUri, senders]) =>
          Array.from(senders).map(async (senderUri) => {
            const userId = parseInt(senderUri.split('/').pop()!, 10);
            const user = await apiUsersIdGet(String(userId));
            const bookId = bookUri.split('/').pop()!
            console.log(bookUri)
            const book = await apiBooksIdGet(bookId).then(book => {
              return book;
            }
            )



            return {
              book: book,
              bookUri,
              bookId: parseInt(bookId, 10),
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
      <ThemedView type='containerItems'>
        <ThemedText style={[styles.emptyText, { color: colors.text }]}>No tienes ningúna conversación</ThemedText>
      </ThemedView>

    );
  }

  return (
    <ThemedView type='containerItems'>
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
              <ThemedText type='default'>
                Nombre: {item.infoBuyer.name}
              </ThemedText>
              <ThemedText>
                Usuario: {item.infoBuyer.surname}
              </ThemedText>

            </View>
            <ThemedText type='default'>
              Titulo: {item.book.name}
            </ThemedText>
            <ThemedText type='default'>
              Precio: {item.book.price}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
  emptyText: { fontSize: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  }
});

export default HomeMessagesScreen;

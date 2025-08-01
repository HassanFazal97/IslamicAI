// HistoryScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ChatContext } from '../contexts/ChatContext';

const COLORS = {
  primary: '#1B7A3E',        // Islamic green
  primaryLight: '#4CAF50',   // Lighter green
  background: '#FFFFFF',     // Pure white
  backgroundLight: '#FAFAFA', // Very light gray
  text: '#212121',           // Dark gray text
  textSecondary: '#757575',  // Secondary text
  border: '#E0E0E0',         // Light border
  shadow: '#00000010',       // Very light shadow
};

export default function HistoryScreen() {
  const { sessions, setCurrentSession } = useContext(ChatContext);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => setCurrentSession(item.id || item)}
      activeOpacity={0.7}
    >
      <View style={styles.chatItemContent}>
        <MaterialIcons name="chat-bubble-outline" size={20} color={COLORS.primary} />
        <Text style={styles.chatItemText}>{item.name || 'Chat Session'}</Text>
        <MaterialIcons name="chevron-right" size={20} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat History</Text>
      </View>
      
      <View style={styles.content}>
        <FlatList
          data={sessions}
          keyExtractor={item => item.id || item}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="history" size={48} color={COLORS.border} />
              <Text style={styles.emptyTitle}>No chat history yet</Text>
              <Text style={styles.emptySubtitle}>Start a conversation to see your chat history here</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  chatItem: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chatItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  chatItemText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});

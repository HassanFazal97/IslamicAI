// ChatScreen.js
// Main chat UI and logic (to be filled in with your Chatbot.js logic)
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Platform, KeyboardAvoidingView, Modal } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ChatContext } from '../contexts/ChatContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import OpenAI and firebase-utils as needed
// import { getAIResponse } from '../utils/openai';
// import { saveChatHistory, getChatHistories, ... } from '../utils/storage';

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

const welcomeMessage = {
  role: 'assistant',
  content: 'Asalamulaikum! I am here as your Islamic companion and guide. I can help with Islamic teachings, practical guidance, and even local recommendations like halal restaurants near you. How may I assist you today?'
};

function MessageBubble({ message, isUser }) {
  return (
    <View style={[styles.messageWrapper, isUser ? styles.userMessageWrapper : styles.botMessageWrapper]}>
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
        <Text style={isUser ? styles.userMessageText : styles.botMessageText}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const { sessions, setSessions, currentSession, setCurrentSession, preferences } = useContext(ChatContext);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentlyTyping, setCurrentlyTyping] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const scrollViewRef = useRef();
  const typingSpeed = 25;

  // Load chat session from context or AsyncStorage
  useEffect(() => {
    // Example: load last session from context or storage
    // setMessages([...])
  }, [currentSession]);

  // Persist current session
  useEffect(() => {
    if (currentSession) {
      AsyncStorage.setItem('lastChatId', currentSession);
    }
  }, [currentSession]);

  // Simulate typing animation
  const simulateTyping = async (text) => {
    setIsTyping(true);
    let currentText = '';
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setCurrentlyTyping(currentText);
      await new Promise(resolve => setTimeout(resolve, typingSpeed));
    }
    setIsTyping(false);
    setCurrentlyTyping('');
    return text;
  };

  // Send message handler (stubbed for now)
  const sendMessage = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const userMessage = { role: 'user', content: inputText };
    setMessages([...messages, userMessage]);
    setInputText('');
    // TODO: Call OpenAI API and get response
    const botResponse = 'This is a placeholder response from the AI.';
    await simulateTyping(botResponse);
    setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Islamic AI Assistant</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setHistoryModalVisible(true)} style={styles.headerButton}>
            <MaterialIcons name="history" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* New chat logic */ }} style={styles.headerButton}>
            <MaterialCommunityIcons name="plus" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

        {/* Chat history modal (to be implemented) */}
        <Modal
          visible={historyModalVisible}
          animationType="slide"
          onRequestClose={() => setHistoryModalVisible(false)}
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Chat History</Text>
              <Text style={styles.modalSubtitle}>Coming Soon</Text>
              <TouchableOpacity onPress={() => setHistoryModalVisible(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <KeyboardAvoidingView 
          style={styles.chatContainer} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView 
            style={styles.messagesContainer}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg, index) => (
              <MessageBubble 
                key={index}
                message={msg}
                isUser={msg.role === 'user'}
              />
            ))}
            {isTyping && (
              <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
                <View style={[styles.messageContainer, styles.botMessage, styles.typingMessage]}>
                  <Text style={styles.botMessageText}>{currentlyTyping}</Text>
                  <ActivityIndicator size="small" color={COLORS.primary} style={styles.typingIndicator} />
                </View>
              </View>
            )}
            {isLoading && !isTyping && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask about Islam, guidance, or anything else..."
                placeholderTextColor={COLORS.textSecondary}
                multiline
                maxHeight={80}
              />
            </View>
            <TouchableOpacity 
              style={[
                styles.sendButton,
                { opacity: isLoading || !inputText.trim() ? 0.4 : 1 }
              ]} 
              onPress={sendMessage}
              disabled={isLoading || !inputText.trim()}
            >
              <MaterialCommunityIcons 
                name={isLoading ? "dots-horizontal" : "send"} 
                size={20} 
                color={COLORS.background} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageWrapper: {
    marginVertical: 4,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageContainer: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 6,
  },
  botMessage: {
    backgroundColor: COLORS.backgroundLight,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  userMessageText: {
    color: COLORS.background,
    fontSize: 16,
    lineHeight: 22,
  },
  botMessageText: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 22,
  },
  typingMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingIndicator: {
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.backgroundLight,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    minWidth: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  modalCloseButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  modalCloseText: {
    color: COLORS.background,
    fontWeight: '500',
  },
});

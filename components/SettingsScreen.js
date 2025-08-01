// SettingsScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput, Platform, ScrollView, TouchableOpacity } from 'react-native';
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

export default function SettingsScreen() {
  const { preferences, setPreferences } = useContext(ChatContext);
  const [personality, setPersonality] = useState(preferences.personality || 'Scholar');
  const [locationEnabled, setLocationEnabled] = useState(preferences.locationEnabled || false);

  const updatePersonality = (val) => {
    setPersonality(val);
    setPreferences({ ...preferences, personality: val });
  };
  
  const updateLocation = (val) => {
    setLocationEnabled(val);
    setPreferences({ ...preferences, locationEnabled: val });
  };

  const SettingItem = ({ icon, title, subtitle, children }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingHeader}>
        <MaterialIcons name={icon} size={24} color={COLORS.primary} />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {children}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chat Preferences</Text>
          
          <SettingItem
            icon="psychology"
            title="Chatbot Personality"
            subtitle="Customize how the AI responds to you"
          >
            <TextInput
              style={styles.textInput}
              value={personality}
              onChangeText={updatePersonality}
              placeholder="Scholar, Friendly, Wise, etc."
              placeholderTextColor={COLORS.textSecondary}
            />
          </SettingItem>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Location</Text>
          
          <SettingItem
            icon="location-on"
            title="Location Services"
            subtitle="Enable location-based recommendations"
          >
            <Switch
              value={locationEnabled}
              onValueChange={updateLocation}
              trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
              thumbColor={locationEnabled ? COLORS.primary : COLORS.textSecondary}
              ios_backgroundColor={COLORS.border}
            />
          </SettingItem>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.aboutItem}>
            <MaterialIcons name="info-outline" size={24} color={COLORS.primary} />
            <View style={styles.aboutTextContainer}>
              <Text style={styles.aboutTitle}>Version</Text>
              <Text style={styles.aboutSubtitle}>1.0.0</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  settingItem: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  aboutTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  aboutSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

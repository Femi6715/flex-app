import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import NavigationDrawer from '../components/NavigationDrawer';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [profileName, setProfileName] = useState('OLUWAFEMI EMMANUEL ALAO');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedName = await AsyncStorage.getItem('profileName');
      const savedImage = await AsyncStorage.getItem('profileImage');
      
      if (savedName) {
        setProfileName(savedName);
      }
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('profileName', profileName);
      if (profileImage) {
        await AsyncStorage.setItem('profileImage', profileImage);
      }
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile data:', error);
      Alert.alert('Error', 'Failed to save profile data');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const navigateToItinerary = () => {
    setIsDrawerVisible(false);
    navigation.navigate('Today\'s Itinerary' as never);
  };

  const navigateToProfile = () => {
    setIsDrawerVisible(false);
    navigation.navigate('Profile' as never);
  };

  const navigateToSettings = () => {
    setIsDrawerVisible(false);
    // Already on settings page, just close drawer
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Orange Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.amazonLogo}>amazon</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        {/* Profile Image Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Picture</Text>
          <View style={styles.imageContainer}>
            <View style={styles.profileImage}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImageContent}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require('../../assets/prof.jpeg')}
                  style={styles.profileImageContent}
                  resizeMode="cover"
                />
              )}
            </View>
            <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
              <Ionicons name="camera" size={20} color="white" />
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Name Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Name</Text>
          <TextInput
            style={styles.nameInput}
            value={profileName}
            onChangeText={setProfileName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            maxLength={50}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Drawer */}
      <NavigationDrawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        onNavigateToItinerary={navigateToItinerary}
        onNavigateToProfile={navigateToProfile}
        onNavigateToSettings={navigateToSettings}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF9900',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 60,
  },
  menuButton: {
    padding: 8,
  },
  logoContainer: {
    flex: 1,
  },
  amazonLogo: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D0D0D0',
    overflow: 'hidden',
    marginBottom: 15,
  },
  profileImageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9900',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  changeImageText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#FF9900',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen; 
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationDrawer from '../components/NavigationDrawer';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [profileName, setProfileName] = useState('OLUWAFEMI EMMANUEL ALAO');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentDateTime(`${dateStr}, ${timeStr}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadProfileData();
    }, [])
  );

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
    // Already on profile page, just close drawer
  };

  const navigateToSettings = () => {
    setIsDrawerVisible(false);
    navigation.navigate('Settings' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Orange Header Bar */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.amazonLogo}>amazon</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Background Image */}
      <Image 
        source={require('../../assets/prof.jpeg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Content Overlay */}
      <View style={styles.contentOverlay}>
                 {/* Profile Picture */}
         <View style={styles.profileImageContainer}>
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
         </View>

                  {/* Name */}
          <Text style={styles.profileName}>{profileName}</Text>

         {/* Date and Time */}
         <Text style={styles.dateTime}>{currentDateTime}</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF9900', // Amazon orange
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 60,
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  profileImageContainer: {
    marginBottom: 60,
  },
  profileImage: {
    width: 350,
    height: 350,
    borderRadius: 175, // 50% of width/height for perfect circle
    backgroundColor: '#E0E0E0', // Light grey background for profile picture
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D0D0D0',
    overflow: 'hidden',
  },
  profileImageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 175, // 50% of width/height for perfect circle
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  dateTime: {
    fontSize: 17,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
});

export default ProfileScreen; 
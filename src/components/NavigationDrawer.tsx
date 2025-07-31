import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NavigationDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigateToItinerary: () => void;
  onNavigateToProfile: () => void;
  onNavigateToSettings: () => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isVisible, onClose, onNavigateToItinerary, onNavigateToProfile, onNavigateToSettings }) => {
  const [profileName, setProfileName] = useState('Oluwafemi Alao');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (isVisible) {
      loadProfileData();
    }
  }, [isVisible]);

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

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        {/* Header with Close Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="rgb(255, 255, 255)" />
          </TouchableOpacity>
        </View>

                 {/* User Profile Section */}
         <TouchableOpacity style={styles.profileSection} onPress={onNavigateToProfile}>
           <View style={styles.profileImage}>
             {profileImage ? (
               <Image
                 source={{ uri: profileImage }}
                 style={styles.profileImageContent}
                 resizeMode="cover"
               />
             ) : (
               <Ionicons name="person" size={60} color="rgb(255, 255, 255)" />
             )}
           </View>
           <Text style={styles.userName}>{profileName}</Text>
         </TouchableOpacity>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Updates</Text>
          </TouchableOpacity>

                     <TouchableOpacity style={styles.menuItem} onPress={onNavigateToItinerary}>
             <Text style={styles.menuText}>Today's Itinerary</Text>
           </TouchableOpacity>

                     <TouchableOpacity style={styles.menuItem}>
             <Text style={styles.menuText}>Offers</Text>
           </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Your Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Learning Portal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToSettings}>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Connected Vehicle</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Emergency Help Section */}
        <View style={styles.emergencySection}>
          <TouchableOpacity style={styles.emergencyButton}>
            <View style={styles.emergencyIcon}>
              <Ionicons name="medical" size={20} color="#FF6B6B" />
            </View>
            <Text style={styles.emergencyText}>Emergency Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#1a1a1a',
    paddingTop: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 1,
    paddingTop: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 1,
    overflow: 'hidden',
  },
  profileImageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 0,
  },
  userName: {
    color: 'rgb(255, 255, 255)',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 10,
  },
  profileButton: {
    backgroundColor: '#2a2a2a',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginTop: -30,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(51, 51, 51)',
  },
  menuText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemWithBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    fontWeight: '400',
  },
  emergencySection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  emergencyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emergencyText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NavigationDrawer; 
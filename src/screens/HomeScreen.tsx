import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationDrawer from '../components/NavigationDrawer';
import { useNavigation } from '@react-navigation/native';

interface UpdateCard {
  id: string;
  icon: string;
  title: string;
  timestamp: string;
  bodyText: string;
  helpfulCount: string;
  linkText: string;
  isReadMore?: boolean;
}

const mockUpdates: UpdateCard[] = [
  {
    id: '1',
    icon: 'logo-amazon',
    title: 'Your guide to Amazon Flex earnings',
    timestamp: 'Monday at 1:40 PM',
    bodyText: 'To help you make the most of your time on the road, we\'re sharing how earnings are calculated, different opportunities to earn, and how you can maximize and track earnings.',
    helpfulCount: '25.2k',
    linkText: 'Visit the Amazon Flex blog to learn more',
  },
  {
    id: '2',
    icon: 'shield-checkmark',
    title: 'Avoiding hazards while making deliveries',
    timestamp: 'Monday at 2:54 PM',
    bodyText: 'When delivering, please be aware of your surroundings. Watch for hazards like mailboxes, gardens and recreational equipment.',
    helpfulCount: '26.7k',
    linkText: 'Click here',
  },
  {
    id: '3',
    icon: 'logo-amazon',
    title: 'Update on Amazon Fresh Block Offers at Baltimore (UMD1)',
    timestamp: 'Friday at 4:02 PM',
    bodyText: 'Amazon is now offering customers the opportunity to shop grocery items as part of an Amazon.com order. As part of this, Amazon Fresh blocks will include a mix of both tip-eligible Fresh and non-ti ...',
    helpfulCount: '',
    linkText: 'read more',
    isReadMore: true,
  },
];

const HomeScreen: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const navigation = useNavigation();

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
    navigation.navigate('Settings' as never);
  };

  const renderUpdateCard = (update: UpdateCard) => (
    <View key={update.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name={update.icon as any} size={24} color="white" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{update.title}</Text>
          <Text style={styles.cardTimestamp}>{update.timestamp}</Text>
        </View>
      </View>
      
      <Text style={styles.cardBody}>{update.bodyText}</Text>
      
      {!update.isReadMore && (
        <View style={styles.feedbackSection}>
          <Text style={styles.helpfulText}>Helpful?</Text>
          <View style={styles.feedbackButtons}>
            <TouchableOpacity style={styles.feedbackButton}>
              <Ionicons name="thumbs-up" size={16} color="#FF9900" />
              <Text style={styles.feedbackCount}>{update.helpfulCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feedbackButton}>
              <Ionicons name="thumbs-down" size={16} color="#FF9900" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <TouchableOpacity style={styles.linkContainer}>
        <Text style={[styles.linkText, update.isReadMore && styles.readMoreLink]}>
          {update.linkText}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={update.isReadMore ? "#FF9900" : "#4CAF50"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Updates Feed */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockUpdates.map(renderUpdateCard)}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text" size={24} color="#FF9900" />
          <Text style={styles.navTextActive}>Updates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="#666" />
          <Text style={styles.navTextInactive}>Schedule</Text>
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
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardTimestamp: {
    fontSize: 14,
    color: '#666',
  },
  cardBody: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 16,
  },
  feedbackSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  helpfulText: {
    fontSize: 14,
    color: '#333',
    marginRight: 16,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF9900',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'white',
  },
  feedbackCount: {
    fontSize: 12,
    color: '#FF9900',
    marginLeft: 4,
    fontWeight: '500',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  linkText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  readMoreLink: {
    color: '#FF9900',
    alignSelf: 'flex-end',
  },
  bottomNav: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navTextActive: {
    fontSize: 12,
    color: '#FF9900',
    marginTop: 4,
    fontWeight: '500',
  },
  navTextInactive: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen; 
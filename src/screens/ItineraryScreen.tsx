import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationDrawer from '../components/NavigationDrawer';
import { useNavigation } from '@react-navigation/native';

interface DeliveryStop {
  id: string;
  stopNumber: number;
  isNextStop: boolean;
  trackingId: string;
  scheduledTime: string;
  address: string;
  city: string;
  action: string;
}

const mockDeliveryStops: DeliveryStop[] = [
  {
    id: '1',
    stopNumber: 2,
    isNextStop: true,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '7307 School Lane',
    city: 'Baltimore',
    action: 'Deliver 1 package',
  },
  {
    id: '2',
    stopNumber: 3,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '7416 ALVAH AVE APT I',
    city: 'DUNDALK',
    action: 'Deliver 1 package',
  },
  {
    id: '3',
    stopNumber: 4,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '1602 SEARLES RD',
    city: 'DUNDALK',
    action: 'Deliver 1 package',
  },
  {
    id: '4',
    stopNumber: 5,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '2:00 PM - 10:48 AM',
    address: '1742 GRANGE RD',
    city: 'BALTIMORE',
    action: 'Deliver 1 package',
  },
  {
    id: '5',
    stopNumber: 6,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '7716 TRAPPE RD',
    city: 'DUNDALK',
    action: 'Deliver 1 package',
  },
  {
    id: '6',
    stopNumber: 7,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '429 OAKWOOD RD',
    city: 'DUNDALK',
    action: 'Deliver 1 package',
  },
  {
    id: '7',
    stopNumber: 8,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '2805 N POINT RD',
    city: 'DUNDALK',
    action: 'Deliver 1 package',
  },
  {
    id: '8',
    stopNumber: 9,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '8188 Gray Haven Rd',
    city: 'Dundalk',
    action: 'Deliver 1 package',
  },
  {
    id: '9',
    stopNumber: 10,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '1729 INVERNESS AVE',
    city: 'DUNDALK',
    action: 'Deliver 1 package',
  },
  {
    id: '10',
    stopNumber: 11,
    isNextStop: false,
    trackingId: 'A.L56.OV',
    scheduledTime: '7:00 AM - 3:00 PM',
    address: '46 AVALON AVE',
    city: 'DUNDALK',
    action: 'Deliver 1 package',
  },
];

const ItineraryScreen: React.FC = () => {
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
    // Already on itinerary page, just close drawer
  };

  const navigateToProfile = () => {
    setIsDrawerVisible(false);
    navigation.navigate('Profile' as never);
  };

  const navigateToSettings = () => {
    setIsDrawerVisible(false);
    navigation.navigate('Settings' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
          <Ionicons name="menu" size={24} color="rgb(255, 255, 255)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ITINERARY</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="chatbubble" size={20} color="rgb(255, 255, 255)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="help-circle" size={20} color="rgb(255, 255, 255)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>LIST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>MAP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>SUMMARY</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Refresh Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={20} color="#666" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by tracking ID"
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.gridButton}>
          <Ionicons name="grid" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Itinerary List */}
      <ScrollView style={styles.itineraryList}>
        {mockDeliveryStops.map((stop, index) => (
          <View key={stop.id} style={styles.stopContainer}>
            {/* Connection Line */}
            {index > 0 && <View style={styles.connectionLine} />}
            
            {/* Stop Circle */}
            <View style={[
              styles.stopCircle,
              stop.isNextStop ? styles.nextStopCircle : styles.regularStopCircle
            ]}>
              <Text style={[
                styles.stopNumber,
                stop.isNextStop ? styles.nextStopNumber : styles.regularStopNumber
              ]}>
                {stop.stopNumber}
              </Text>
            </View>

            {/* Stop Content */}
            <View style={styles.stopContent}>
              {stop.isNextStop && (
                <Text style={styles.nextStopLabel}>Next Stop:</Text>
              )}
              
              <View style={styles.stopInfo}>
                                 <Ionicons name="time" size={16} color="rgb(0, 122, 255)" />
                <Text style={styles.trackingInfo}>
                  #{stop.trackingId} • Scheduled {stop.scheduledTime}
                </Text>
              </View>
              
              <Text style={styles.address}>{stop.address}</Text>
              <Text style={styles.city}>{stop.city}</Text>
              <Text style={styles.action}>{stop.action}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

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
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
     activeTab: {
     borderBottomWidth: 2,
     borderBottomColor: 'rgb(255, 255, 255)',
   },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'rgb(255, 255, 255)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  refreshButton: {
    padding: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
  },
  gridButton: {
    padding: 4,
  },
  itineraryList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stopContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  connectionLine: {
    position: 'absolute',
    left: 19,
    top: -16,
    width: 2,
    height: 16,
    backgroundColor: '#333',
  },
  stopCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  regularStopCircle: {
    backgroundColor: '#333',
  },
  nextStopCircle: {
    backgroundColor: '#4CAF50',
  },
  stopNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  regularStopNumber: {
    color: 'rgb(255, 255, 255)',
  },
  nextStopNumber: {
    color: 'rgb(255, 255, 255)',
  },
  stopContent: {
    flex: 1,
  },
  nextStopLabel: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  stopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
     trackingInfo: {
     color: 'rgb(255, 255, 255)',
     fontSize: 14,
     marginLeft: 4,
   },
  address: {
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  city: {
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    marginBottom: 2,
  },
  action: {
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
  },
});

export default ItineraryScreen; 
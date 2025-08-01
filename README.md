#

### 🏠 Home Screen
- View available delivery blocks with time slots and pay rates
- Quick stats showing hours worked, earnings, and deliveries
- Accept delivery blocks
- Quick action buttons for navigation and support

### 📅 Today's Itinerary
- Current block status with progress tracking
- Today's schedule with all delivery blocks
- Package delivery progress
- Navigation to next delivery stop
- Quick actions for route viewing and package lists

### 👤 Profile Screen
- Driver profile with photo and rating
- Earnings and work statistics
- Account management options
- Work-related settings
- Support and help options
- App settings and preferences

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Expo Vector Icons** for icons
- **React Native Paper** for UI components

## Prerequisites

Before running this app, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd AmazonFlexClone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install additional required packages:**
   ```bash
   npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler
   ```

## Running the App

### For Android:
```bash
npm run android
```

### For iOS (macOS only):
```bash
npm run ios
```

### For Web:
```bash
npm run web
```

### Using Expo Go App:
```bash
npx expo start
```
Then scan the QR code with the Expo Go app on your mobile device.

## Project Structure

```
AmazonFlexClone/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Main home screen
│   │   ├── ItineraryScreen.tsx     # Today's itinerary
│   │   └── ProfileScreen.tsx       # User profile
│   ├── components/                 # Reusable components
│   └── types/                      # TypeScript type definitions
├── App.tsx                         # Main app component
├── package.json                    # Dependencies
└── README.md                       # This file
```

## Key Features Implementation

### Navigation
- Bottom tab navigation with three main screens
- Custom tab icons using Ionicons
- Amazon Flex brand colors (#FF9900, #232F3E)

### UI/UX Design
- Modern, clean interface following Amazon's design principles
- Card-based layouts with shadows and rounded corners
- Consistent color scheme and typography
- Responsive design for different screen sizes

### Mock Data
The app currently uses mock data for demonstration purposes:
- Sample delivery blocks with different time slots
- Mock user profile information
- Simulated earnings and statistics

## Customization

### Colors
The app uses Amazon's brand colors:
- Primary: #FF9900 (Amazon Orange)
- Secondary: #232F3E (Amazon Dark Blue)
- Background: #f5f5f5 (Light Gray)

### Icons
All icons are from the Ionicons library, which is included with Expo.

## Future Enhancements

- Real-time GPS tracking
- Push notifications for new blocks
- Integration with actual Amazon Flex API
- Offline mode support
- Multi-language support
- Dark mode theme
- Advanced analytics and reporting

## Troubleshooting

### Common Issues

1. **Metro bundler issues:**
   ```bash
   npx expo start --clear
   ```

2. **Android build issues:**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build issues:**
   ```bash
   cd ios && pod install && cd ..
   ```

### Dependencies Issues
If you encounter dependency-related errors:
```bash
rm -rf node_modules
npm install
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only. Amazon Flex is a registered trademark of Amazon.com, Inc.

## Support

For support or questions, please open an issue in the repository or contact the development team. 

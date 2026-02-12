/**
 * CountryPicker Demo App
 * Showcases the CountryPicker component with various configurations
 */

import React from 'react';
import { StatusBar, StyleSheet, Text, ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CountryPicker, Country } from './src/components';
import { ThemeProvider, useTheme } from './src/utils';

function AppContent() {
  const { colors, isDarkMode } = useTheme();

  const handleSelectCountry = (country: Country) => {
    console.log('Selected country:', country.name, country.code);
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.title, { color: colors.text.primary }]}>
            Country Picker Demo
          </Text>

          {/* Basic Usage */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Basic Usage
          </Text>
          <CountryPicker onSelectCountry={handleSelectCountry} />

          {/* Fullscreen Mode */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Fullscreen Mode
          </Text>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            fullScreen
            preferredCountries={['US', 'GB', 'CA', 'AU', 'IN']}
          />

          {/* Custom Theme */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Custom Theme
          </Text>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            theme={{
              primaryColor: '#6366F1',
              borderColor: '#E5E7EB',
            }}
            pickerFieldStyle={styles.customPicker}
            bottomSheetHeight={0.8}
            showCallingCode={false}
            radioButtonColor="#6366F1"
          />

          {/* Locale Support - German (auto-translated UI) */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            German Locale (de)
          </Text>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            locale="de"
          />

          {/* Locale Support - Japanese (auto-translated UI) */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Japanese Locale (jp)
          </Text>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            locale="jp"
          />

          {/* Calling Code Mode - For Phone Number Inputs */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Calling Code Mode
          </Text>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            callingCodeMode
          />

          {/* Calling Code Mode with Country Code */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Calling Code with Country Code
          </Text>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            callingCodeMode
            showCountryCodeInCallingCodeMode
          />

          {/* Auto-select by Device Region */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Auto-select by Device Region
          </Text>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            autoSelectByDeviceRegion
          />

          {/* Auto-select by IP Address */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Auto-select by IP Address
          </Text>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            autoSelectByIP
          />

          {/* Calling Code with Device Region */}
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            {'Calling Code + (Device Region / IP Detection)'}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            callingCodeMode
            autoSelectByDeviceRegion
            containerStyle={{ width: '45%' }}
          />
          <CountryPicker
            onSelectCountry={handleSelectCountry}
            callingCodeMode
            autoSelectByIP
            containerStyle={{ width: '45%' }}
            />
            </View>

         
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  customPicker: {
    borderRadius: 12,
    borderWidth: 2,
  },
});

export default App;

import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Linking, SafeAreaView } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleOpenInstagram = () => {
    Linking.openURL('https://www.instagram.com/mariosianturii');
  };

  const handleOpenWhatsApp = () => {
    Linking.openURL('https://wa.me/6287716554446');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileImageWrapper}>
            <Image source={require('../../assets/Profile.jpg')} style={styles.profileImage} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Togar Anthony Mario Sianturi</Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity onPress={handleOpenInstagram} style={styles.socialLink}>
                <Image source={require('../../assets/InstagramIcon.png')} style={styles.socialIcon} />
                <Text style={styles.profileDetails}>@mariosianturii</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleOpenWhatsApp} style={styles.socialLink}>
                <Image source={require('../../assets/WhatsAppIcon.png')} style={styles.socialIcon} />
                <Text style={styles.profileDetails}>+628771655446</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.sectionContent}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nickname:</Text>
              <Text style={styles.infoValue}>Mario</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Birthdate:</Text>
              <Text style={styles.infoValue}>July 19, 2004</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Country:</Text>
              <Text style={styles.infoValue}>Indonesia</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Favorite Teams</Text>
          <View style={styles.sectionContent}>
            <View style={styles.teamWrapper}>
              <Image source={require('../../assets/LosAngelesLakersLogo.png')} style={styles.teamLogo} />
              <Text style={styles.teamName}>Los Angeles Lakers</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Favorite Players</Text>
          <View style={styles.sectionContent}>
            <View style={styles.teamWrapper}>
              <Image source={require('../../assets/LebronJames.png')} style={styles.teamLogo} />
              <Text style={styles.teamName}>Lebron James</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  profileCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImageWrapper: {
    backgroundColor: '#374151',
    borderRadius: 80,
    padding: 4,
    marginBottom: 16,
    elevation: 3,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 8,
  },
  profileDetails: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  socialLinks: {
    alignItems: 'flex-start',
    marginTop: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  sectionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 16,
  },
  sectionContent: {
    paddingHorizontal: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#9CA3AF',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#F3F4F6',
  },
  teamWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamLogo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  teamName: {
    fontSize: 16,
    color: '#F3F4F6',
  },
});

export default ProfileScreen;

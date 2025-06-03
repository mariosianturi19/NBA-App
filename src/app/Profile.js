import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import styled from 'styled-components/native';

const ProfileScreen = ({ navigation }) => {
  const handleOpenInstagram = () => {
    Linking.openURL('https://www.instagram.com/mariosianturii');
  };

  const handleOpenWhatsApp = () => {
    Linking.openURL('https://wa.me/6287716554446');
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileCard>
          <ProfileImageWrapper>
            <ProfileImage source={require('../../assets/Profile.jpg')} />
          </ProfileImageWrapper>
          <ProfileInfo>
            <ProfileName>Togar Anthony Mario Sianturi</ProfileName>
            <SocialLinks>
              <TouchableOpacity onPress={handleOpenInstagram} style={styles.socialLink}>
                <SocialIcon source={require('../../assets/InstagramIcon.png')} />
                <ProfileDetails>@mariosianturii</ProfileDetails>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleOpenWhatsApp} style={styles.socialLink}>
                <SocialIcon source={require('../../assets/WhatsAppIcon.png')} />
                <ProfileDetails>+628771655446</ProfileDetails>
              </TouchableOpacity>
            </SocialLinks>
          </ProfileInfo>
        </ProfileCard>

        <SectionCard>
          <SectionTitle>Personal Information</SectionTitle>
          <SectionContent>
            <InfoItem>
              <InfoLabel>Nickname:</InfoLabel>
              <InfoValue>Mario</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Birthdate:</InfoLabel>
              <InfoValue>July 19, 2004</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Country:</InfoLabel>
              <InfoValue>Indonesia</InfoValue>
            </InfoItem>
          </SectionContent>
        </SectionCard>

        <SectionCard>
          <SectionTitle>Favorite Teams</SectionTitle>
          <SectionContent>
            <TeamWrapper>
              <TeamLogo source={require('../../assets/LosAngelesLakersLogo.png')} />
              <TeamName>Los Angeles Lakers</TeamName>
            </TeamWrapper>
          </SectionContent>
        </SectionCard>

        <SectionCard>
          <SectionTitle>Favorite Players</SectionTitle>
          <SectionContent>
            <TeamWrapper>
              <TeamLogo source={require('../../assets/LebronJames.png')} />
              <TeamName>Lebron James</TeamName>
            </TeamWrapper>
          </SectionContent>
        </SectionCard>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 24,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
});

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #111827;
`;

const ProfileCard = styled.View`
  background-color: #1F2937;
  border-radius: 20px;
  padding: 24px;
  align-items: center;
  margin-bottom: 24px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const ProfileImageWrapper = styled.View`
  background-color: #374151;
  border-radius: 80px;
  padding: 4px;
  margin-bottom: 16px;
  elevation: 3;
`;

const ProfileImage = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 64px;
`;

const ProfileInfo = styled.View`
  align-items: center;
`;

const ProfileName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #F3F4F6;
  margin-bottom: 8px;
`;

const ProfileDetails = styled.Text`
  font-size: 16px;
  color: #9CA3AF;
  margin-left: 8px;
`;

const SocialLinks = styled.View`
  align-items: flex-start;
  margin-top: 8px;
`;

const SocialIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const SectionCard = styled.View`
  background-color: #1F2937;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #F3F4F6;
  margin-bottom: 16px;
`;

const SectionContent = styled.View`
  padding-horizontal: 12px;
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const InfoLabel = styled.Text`
  font-size: 16px;
  color: #9CA3AF;
  width: 100px;
`;

const InfoValue = styled.Text`
  font-size: 16px;
  color: #F3F4F6;
`;

const TeamWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const TeamLogo = styled.Image`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`;

const TeamName = styled.Text`
  font-size: 16px;
  color: #F3F4F6;
`;

export default ProfileScreen;

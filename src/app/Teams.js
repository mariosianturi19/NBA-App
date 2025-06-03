import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  RefreshControl, 
  Alert, 
  StyleSheet, 
  TextInput 
} from 'react-native';
import { Card, Text, Divider } from 'react-native-elements';
import styled from 'styled-components/native';
import { getNBATeams } from '../service/TeamsService';

const TeamsScreen = ({ navigation }) => {
  const [nbaTeams, setNBATeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getNBATeams();
      const teamsWithLogos = (response.response || []).filter(team => 
        team.logo && team.logo.trim() !== ''
      );
      setNBATeams(teamsWithLogos);
      setFilteredTeams(teamsWithLogos);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data tim NBA');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredTeams(nbaTeams);
    } else {
      const filtered = nbaTeams.filter(team => 
        team.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTeams(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Players', { teamId: item.id, season: '2023' })}
      activeOpacity={0.7}
    >
      <StyledCard containerStyle={styles.card}>
        <StyledImageWrapper>
          <StyledTeamImage 
            source={{ uri: item.logo }} 
          />
        </StyledImageWrapper>
        <Card.Title style={styles.name}>{item.name}</Card.Title>
        <StyledDivider />
        <Text style={styles.location}>{item.city}</Text>
      </StyledCard>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Text style={styles.header}>NBA Teams</Text>
      <SearchBar
        placeholder="Cari Teams NBA ..."
        value={searchText}
        onChangeText={handleSearch}
        placeholderTextColor="#9CA3AF"
      />
      <FlatList
        data={filteredTeams}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#60A5FA"
            colors={["#60A5FA"]}
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading && (
            <EmptyContainer>
              <EmptyText>Tim tidak ditemukan</EmptyText>
            </EmptyContainer>
          )
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3F4F6',
    padding: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 16,
    elevation: 8,
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: '#1F2937',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 10,
    color: '#F3F4F6',
    letterSpacing: 0.5,
  },
  location: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 10,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 12,
  },
});

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #111827;
`;

const SearchBar = styled(TextInput)`
  height: 40px;
  margin: 12px 16px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #1F2937;
  color: #F3F4F6;
  font-size: 16px;
`;

const StyledCard = styled(Card).attrs({
  containerStyle: styles.card,
})`
  border-width: 0;
`;

const StyledImageWrapper = styled.View`
  background-color: #374151;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  height: 120px;
  overflow: hidden;
`;

const StyledTeamImage = styled(Card.Image)`
  height: 120px;
  opacity: 0.7;
`;

const StyledDivider = styled(Divider)`
  background-color: #374151;
  height: 1px;
  margin-vertical: 8px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  color: #9CA3AF;
  text-align: center;
`;

export default TeamsScreen;

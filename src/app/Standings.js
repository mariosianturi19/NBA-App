import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, RefreshControl, Alert } from 'react-native';
import { Card, Text } from 'react-native-elements';
import styled from 'styled-components/native';
import { getNBAStandings } from '../service/StandingService';

const StandingsScreen = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [ascending, setAscending] = useState(true);

  const fetchStandings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNBAStandings();
      setStandings(data);
    } catch (error) {
      setError('Gagal memuat data standings NBA');
      Alert.alert('Error', 'Terjadi kesalahan saat memuat data standings', [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStandings().finally(() => setRefreshing(false));
  };

  const sortedStandings = standings.sort((a, b) => {
    if (ascending) {
      return a.conference.rank - b.conference.rank;
    } else {
      return b.conference.rank - a.conference.rank;
    }
  });

  const renderItem = ({ item }) => (
    <StandingsCard>
      <TeamName>{item?.team?.name || 'Unknown Team'}</TeamName>
      <StyledDivider />
      <StatsRow>
        <StatItem>
          <StatLabel>Rank</StatLabel>
          <StatValue>{item?.conference?.rank || 'N/A'}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Wins</StatLabel>
          <StatValue>{item?.win?.total || 'N/A'}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Losses</StatLabel>
          <StatValue>{item?.loss?.total || 'N/A'}</StatValue>
        </StatItem>
      </StatsRow>
    </StandingsCard>
  );

  return (
    <Container>
      <Title>NBA Standings</Title>
      <SortButton onPress={() => setAscending(!ascending)}>
        <SortButtonText>
          {ascending ? "Sort by Lowest Rank" : "Sort by Highest Rank"}
        </SortButtonText>
      </SortButton>
      
      <FlatList
        data={sortedStandings}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#60A5FA"
            colors={["#60A5FA"]}
          />
        }
        ListEmptyComponent={
          !loading && (
            <EmptyContainer>
              <EmptyText>Tidak ada data standings</EmptyText>
            </EmptyContainer>
          )
        }
      />
    </Container>
  );
};

const styles = {
  listContainer: {
    padding: 16,
  },
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #111827;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-vertical: 16px;
  color: #F3F4F6;
  letter-spacing: 0.5px;
`;

const StandingsCard = styled(Card).attrs({
  containerStyle: {
    borderRadius: 16,
    elevation: 8,
    marginHorizontal: 2,
    marginVertical: 8,
    backgroundColor: '#1F2937',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 16,
  },
})``;

const TeamName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #F3F4F6;
  margin-bottom: 12px;
  text-align: center;
  letter-spacing: 0.5px;
`;

const StyledDivider = styled.View`
  height: 1px;
  background-color: #374151;
  margin-vertical: 12px;
`;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 4px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  color: #9CA3AF;
  margin-bottom: 4px;
`;

const StatValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #60A5FA;
`;

const SortButton = styled.TouchableOpacity`
  background-color: #2563EB;
  padding-vertical: 12px;
  padding-horizontal: 24px;
  border-radius: 12px;
  margin-horizontal: 16px;
  margin-bottom: 16px;
`;

const SortButtonText = styled.Text`
  color: #F3F4F6;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
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

export default StandingsScreen;
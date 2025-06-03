import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  SafeAreaView,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { getNBATeamsPlayers } from '../service/PlayersService';

const PlayersScreen = ({ route }) => {
  const { teamId, season } = route.params;
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await getNBATeamsPlayers(teamId, season);
      setPlayers(response.response || []);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data pemain NBA');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPlayers().finally(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <PlayerCard>
      <PlayerImageWrapper>
        <PlayerImage/>
      </PlayerImageWrapper>
      <PlayerInfo>
        <PlayerName>{item.firstname} {item.lastname}</PlayerName>
        <PlayerDetails>
          Posisi: <DetailText>{item.pos || 'N/A'}</DetailText>
        </PlayerDetails>
        <PlayerDetails>
          Nomor Jersey: <DetailText>{item.leagues?.standard?.jersey || 'N/A'}</DetailText>
        </PlayerDetails>
        <PlayerDetails>
          Tinggi: <DetailText>{item.height?.feets || 'N/A'}' {item.height?.inches || 'N/A'}"</DetailText>
        </PlayerDetails>
        <PlayerDetails>
          Berat: <DetailText>{item.weight?.pounds || 'N/A'} lbs</DetailText>
        </PlayerDetails>
        <PlayerDetails>
          Asal: <DetailText>{item.birth?.country || 'N/A'}</DetailText>
        </PlayerDetails>
      </PlayerInfo>
    </PlayerCard>
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#60A5FA" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
              <EmptyText>Tidak ada data pemain</EmptyText>
            </EmptyContainer>
          )
        }
      />
    </Container>
  );
};

const styles = {
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #111827;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #111827;
`;

const PlayerCard = styled.View`
  flex-direction: row;
  background-color: #1F2937;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 12px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const PlayerImageWrapper = styled.View`
  background-color: #374151;
  border-radius: 40px;
  padding: 2px;
  elevation: 3;
`;

const PlayerImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

const PlayerInfo = styled.View`
  flex: 1;
  margin-left: 16px;
  justify-content: center;
`;

const PlayerName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #F3F4F6;
  margin-bottom: 4px;
`;

const PlayerDetails = styled.Text`
  font-size: 14px;
  color: #9CA3AF;
`;

const DetailText = styled.Text`
  font-weight: bold;
  color: #F3F4F6;
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

export default PlayersScreen;

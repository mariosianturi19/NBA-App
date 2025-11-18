import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text,
  Image,
  FlatList, 
  SafeAreaView,
  RefreshControl,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
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
    <View style={styles.playerCard}>
      <View style={styles.playerImageWrapper}>
        <Image style={styles.playerImage} />
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.firstname} {item.lastname}</Text>
        <Text style={styles.playerDetails}>
          Posisi: <Text style={styles.detailText}>{item.pos || 'N/A'}</Text>
        </Text>
        <Text style={styles.playerDetails}>
          Nomor Jersey: <Text style={styles.detailText}>{item.leagues?.standard?.jersey || 'N/A'}</Text>
        </Text>
        <Text style={styles.playerDetails}>
          Tinggi: <Text style={styles.detailText}>{item.height?.feets || 'N/A'}' {item.height?.inches || 'N/A'}"</Text>
        </Text>
        <Text style={styles.playerDetails}>
          Berat: <Text style={styles.detailText}>{item.weight?.pounds || 'N/A'} lbs</Text>
        </Text>
        <Text style={styles.playerDetails}>
          Asal: <Text style={styles.detailText}>{item.birth?.country || 'N/A'}</Text>
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#60A5FA" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tidak ada data pemain</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  playerCard: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playerImageWrapper: {
    backgroundColor: '#374151',
    borderRadius: 40,
    padding: 2,
    elevation: 3,
  },
  playerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  playerDetails: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  detailText: {
    fontWeight: 'bold',
    color: '#F3F4F6',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default PlayersScreen;

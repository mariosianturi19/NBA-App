import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, RefreshControl, Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.standingsCard}>
      <Text style={styles.teamName}>{item?.team?.name || 'Unknown Team'}</Text>
      <View style={styles.divider} />
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Rank</Text>
          <Text style={styles.statValue}>{item?.conference?.rank || 'N/A'}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Wins</Text>
          <Text style={styles.statValue}>{item?.win?.total || 'N/A'}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Losses</Text>
          <Text style={styles.statValue}>{item?.loss?.total || 'N/A'}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>NBA Standings</Text>
      <TouchableOpacity 
        style={styles.sortButton}
        onPress={() => setAscending(!ascending)}
      >
        <Text style={styles.sortButtonText}>
          {ascending ? "Sort by Lowest Rank" : "Sort by Highest Rank"}
        </Text>
      </TouchableOpacity>
      
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
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tidak ada data standings</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#F3F4F6',
    letterSpacing: 0.5,
  },
  standingsCard: {
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
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60A5FA',
  },
  sortButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sortButtonText: {
    color: '#F3F4F6',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default StandingsScreen;
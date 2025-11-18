import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  RefreshControl, 
  Alert, 
  StyleSheet, 
  TextInput,
  View,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';
import { getNBATeams } from '../service/TeamsService';

const TeamCard = ({ item, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          {item.logo && !imageError ? (
            <>
              <Image 
                source={{ 
                  uri: item.logo,
                  cache: 'force-cache'
                }} 
                style={styles.teamImage}
                resizeMode="contain"
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
                onError={(e) => {
                  console.log('Image load error for', item.name, ':', e.nativeEvent.error);
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
              {imageLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="small" color="#60A5FA" />
                </View>
              )}
            </>
          ) : (
            <View style={styles.placeholderLogo}>
              <Text style={styles.placeholderText}>
                {item.code || item.nickname?.substring(0, 3).toUpperCase() || 'NBA'}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.nickname}>{item.nickname}</Text>
        <View style={styles.divider} />
        <View style={styles.infoContainer}>
          <Text style={styles.location}>📍 {item.city}</Text>
          {item.leagues?.standard?.conference && (
            <Text style={styles.conference}>
              {item.leagues.standard.conference} Conference
            </Text>
          )}
          {item.leagues?.standard?.division && (
            <Text style={styles.division}>
              {item.leagues.standard.division} Division
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
    <TeamCard 
      item={item} 
      onPress={() => navigation.navigate('Players', { teamId: item.id, season: '2024' })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>NBA Teams</Text>
      <TextInput
        style={styles.searchBar}
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
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tim tidak ditemukan</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3F4F6',
    padding: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  searchBar: {
    height: 40,
    margin: 12,
    marginHorizontal: 16,
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1F2937',
    color: '#F3F4F6',
    fontSize: 16,
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
    padding: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    backgroundColor: '#374151',
    borderRadius: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
  },
  teamImage: {
    height: 100,
    width: 100,
  },
  placeholderLogo: {
    height: 100,
    width: 100,
    backgroundColor: '#60A5FA',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3F4F6',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(55, 65, 81, 0.7)',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
    color: '#F3F4F6',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  nickname: {
    fontSize: 16,
    fontWeight: '600',
    color: '#60A5FA',
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    backgroundColor: '#374151',
    height: 1,
    marginVertical: 12,
  },
  infoContainer: {
    gap: 4,
  },
  location: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },
  conference: {
    fontSize: 14,
    color: '#60A5FA',
    textAlign: 'center',
    fontWeight: '500',
  },
  division: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 12,
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

export default TeamsScreen;

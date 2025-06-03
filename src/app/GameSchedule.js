import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { getNBAGamesByDate } from '../service/NBAService';

const GamesSchedule = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const date = '2022-02-12';
        const data = await getNBAGamesByDate(date);
        setGames(data.response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const openModal = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedGame(null);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#60A5FA" />
      </View>
    );
  }

  const renderGameItem = ({ item }) => {
    const homeTeam = item.teams?.home?.name || 'Unknown';
    const awayTeam = item.teams?.visitors?.name || 'Unknown';
    const homeScore = item.scores?.home?.points || 0;
    const awayScore = item.scores?.visitors?.points || 0;

    return (
      <TouchableOpacity onPress={() => openModal(item)} style={styles.gameCard}>
        <View style={styles.teamContainer}>
          <View style={styles.teamSection}>
            <Text style={styles.teamName}>{homeTeam}</Text>
            <Text style={styles.score}>{homeScore}</Text>
          </View>
          
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          
          <View style={styles.teamSection}>
            <Text style={styles.teamName}>{awayTeam}</Text>
            <Text style={styles.score}>{awayScore}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>NBA Games Schedule</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGameItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {selectedGame && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Game Details</Text>

              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Date:</Text>
                <Text style={styles.modalValue}>{new Date(selectedGame.date.start).toLocaleString()}</Text>
              </View>
              
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Status:</Text>
                <Text style={styles.modalValue}>{selectedGame.status.long}</Text>
              </View>
              
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Arena:</Text>
                <Text style={styles.modalValue}>{selectedGame.arena.name}, {selectedGame.arena.city}</Text>
              </View>
              
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Times Tied:</Text>
                <Text style={styles.modalValue}>{selectedGame.timesTied}</Text>
              </View>
              
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Lead Changes:</Text>
                <Text style={styles.modalValue}>{selectedGame.leadChanges}</Text>
              </View>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3F4F6',
    padding: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  listContainer: {
    padding: 16,
  },
  gameCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamSection: {
    flex: 2,
    alignItems: 'center',
  },
  vsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F3F4F6',
    textAlign: 'center',
    marginBottom: 8,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#60A5FA',
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 12,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  modalLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
  },
  modalValue: {
    fontSize: 14,
    color: '#F3F4F6',
    flex: 1,
    textAlign: 'right',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#60A5FA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    color: '#F3F4F6',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GamesSchedule;

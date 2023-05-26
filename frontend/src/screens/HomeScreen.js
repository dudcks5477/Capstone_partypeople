import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SearchBar from '../container/SearchBar';
import Line from '../container/Line';
import Card from '../components/Card';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [partyData, setPartyData] = useState(null);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.35.21.149:8080/party');
        setPartyData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > 50) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  return (
    <View style={styles.container}>
      {showHeader && (
        <>
          <SearchBar />
          <Line style={{ marginTop: 20 }} />
        </>
      )}
      <SafeAreaView style={styles.containerNotch}>
        <View style={styles.containerParty}>
          <ScrollView onScroll={handleScroll}>
            {partyData && partyData.map((party, index) => (
              <TouchableOpacity
              key={index}
              style={styles.cardButton}
              onPress={() => navigation.navigate('PartyDetail', party.id)}
              activeOpacity={1}>
              <Card partyData={party}/>
            </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  containerParty: {
    marginVertical: 10,
  },
  cardButton: {
    marginBottom: 10,
  },
});

export default HomeScreen;

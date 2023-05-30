import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SearchBar from '../container/SearchBar';
import Line from '../container/Line';
import Card from '../components/Card';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [partyData, setPartyData] = useState(null);

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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerNotch}>
        <View style={styles.containerSearch}>
          <SearchBar />
          <Line style={{ marginTop: 20 }} />
        </View>

        <ScrollView style={styles.containerParty}>
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  containerNotch: {
    flex: 1,
  },
  containerParty: {
    marginTop: 10
  },
  cardButton: {
    marginBottom: 10,
  },
});

export default HomeScreen;

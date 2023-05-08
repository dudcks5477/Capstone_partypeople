import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import 추가
import SearchBar from '../container/SearchBar';
import Line from '../container/Line';
import Card from '../components/Card';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [partyData, setPartyData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const partyData = await AsyncStorage.getItem('partyData');
        if (partyData !== null) {
          setPartyData(JSON.parse(partyData));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  return (
    <>
      <SearchBar />
      <Line style={{ marginTop: 20 }} />
      <SafeAreaView style={styles.containerNotch}>
        <View style={styles.container}>
          <ScrollView>
          {partyData && (
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => navigation.navigate('PartyDetail')}
                activeOpacity={1}>
                <Card partyData={partyData}/>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerNotch: {
    flex: 1,
  },
  container: {
    marginVertical: 10,
  },
  cardButton: {
    marginBottom: 10,
  },
});

export default HomeScreen;

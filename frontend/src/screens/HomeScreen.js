import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, TouchableOpacity,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import 추가
import SearchBar from '../container/SearchBar';
import Line from '../container/Line';
import Card from '../components/Card';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [partyData, setPartyData] = useState(null);
  const [showHeader, setShowHeader] = useState(true);

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

  // 스크롤 50 이상하면 searchBar랑 Line 사라지는거
  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > 50) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  // const clearAllData = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage cleared successfully');
  //   } catch (e) {
  //     console.log('Failed to clear AsyncStorage:', e);
  //   }
  // };
  
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
        <View>
        {/* <Button title="Clear AsyncStorage" onPress={clearAllData} /> */}
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

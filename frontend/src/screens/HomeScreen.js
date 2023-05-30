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

  const scrollOffset = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    scrollOffset,
    0,
    50
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.35.21.149:8080/party');
        setPartyData(response.data);
        console.log("home",response.data)
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: searchBarOpacity,
          transform: [{ translateY: searchBarTranslate }],
        }}>
        <SearchBar />
        <Line style={{ marginTop: 20 }} />
      </Animated.View>

      <SafeAreaView style={styles.containerNotch}>
        <View style={styles.containerParty}>
          <Animated.ScrollView
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffset }}}],
              { useNativeDriver: true},
            )}
            scrollEventThrottle={16}>
            {partyData && partyData.map((party, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cardButton}
                onPress={() => navigation.navigate('PartyDetail', party.id)}
                activeOpacity={1}>
                <Card partyData={party}/>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
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

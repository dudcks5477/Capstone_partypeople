// |이 코드는 React Native를 사용하여 카드 형식의 숙박 시설 목록을 표시하는 컴포넌트입니다.
// |
// |좋은 점:
// |- listings 배열을 사용하여 데이터를 구성하고, ScrollView와 Card 컴포넌트를 사용하여 각 항목을 렌더링합니다.
// |- SafeAreaView를 사용하여 노치 디자인을 고려하여 뷰를 렌더링합니다.
// |- 스타일링을 위해 StyleSheet.create를 사용하여 스타일 객체를 만들고, 컴포넌트의 스타일 속성에 적용합니다.
// |
// |나쁜 점:
// |- listings 배열의 데이터가 정적으로 작성되어 있으므로, 동적으로 데이터를 가져오는 방법을 추가해야 합니다.
// |- Card 컴포넌트의 구현이 누락되어 있으므로, 해당 컴포넌트의 구현을 확인해야 합니다.
// |
 
import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import Card from './Card';

const listings = [
  {
    id: 1,
    image: require('../assets/newyork.jpeg'),
    title: 'Luxury Villa in Bali, New York',
    description:
      'Escape to your own private luxury villa in the heart of Bali. Relax by the pool, enjoy the view, and experience the ultimate in luxury.',
    price: '$450/night',
  },
  {
    id: 2,
    image: require('../assets/paris.jpeg'),
    title: 'Mountain Cottage in Paris',
    description:
      'Get away from it all in this cozy mountain cottage in the Swiss Alps. Perfect for hiking, skiing, and enjoying the great outdoors.',
    price: '$120/night',
  },
  {
    id: 3,
    image: require('../assets/seoul.jpeg'),
    title: 'Beachfront Bungalow in Seoul',
    description:
      'Relax on the beach in your own private bungalow in Thailand. Perfect for soaking up the sun, swimming in the sea, and enjoying the local cuisine.',
    price: '$200/night',
  },
];

const PartyCard = () => {
  const handleCardPress = (id) => {
    // 카드를 클릭했을 때의 동작
    console.log(`Clicked card with ID: ${id}`);
  }
  
  return (
    <SafeAreaView style={styles.containerNotch}>
      <View style={styles.container}>
        <ScrollView>
          {listings.map(listing => (
            <TouchableOpacity
              key={listing.id}
              style={styles.cardButton}
              onPress={() => handleCardPress(listing.id)}
              activeOpacity={1}
            >
              <Card {...listing} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
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

export default PartyCard;
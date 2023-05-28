import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, Dimensions, Pressable } from 'react-native';
import Line from '../container/Line';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PrivateProfileScreen = () => {
  const onItemPress = (itemName) => {
    console.log(`${itemName} clicked`);
  };

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [partyName, setPartyName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#222",
    }}>
      <Text style={{ color: '#ccc', fontSize: 40, fontWeight: 'bold', marginLeft: 15, marginTop: 30 }}>
        프로필
      </Text>
      <Line style={{ marginTop: 20, width: '90%', marginHorizontal: '5%' }} />
      <View style={{ marginTop: 5, width: '90%', marginHorizontal: '5%', flexDirection: 'row' }}>
        <MaterialIcons name="account-circle" size={60} color="gray" style={{ marginRight: 2 }} />
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, color: '#ccc' }}>주최자</Text>
          <Text style={{ fontSize: 12, color: '#ccc' }}>Show profile</Text>
        </View>
      </View>
      <View style={{ width: '90%', marginHorizontal: '5%' }}>
        <Text style={{ marginTop: 5, marginBottom:5, fontSize: 25, fontWeight: 'bold', height: 223, color: '#ccc'}}>참석 예정</Text>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={[styles.modalView, { marginTop: 'auto' }]}>
                <Text style={styles.modalText}>
                  파티이름: {partyName} {'\n'}
                  날짜: {date}{'\n'}
                  시간: {time}{'\n'}
                  인원: {numOfPeople}{'\n'}
                  설명: {description}
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>닫기</Text>
                </Pressable>
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={() => {
                    navigation.navigate('PartyDetail');
                  }}
                >
                  <Text style={styles.navigateText}>Navigate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      <Line />
      <View style={{ width: '90%', marginHorizontal: '5%' }}>
        <Text style={{ marginTop: 5, marginBottom: 15, fontSize: 25, fontWeight: 'bold', color: '#ccc' }}>세팅</Text>

        <TouchableOpacity onPress={() => onItemPress('Personal Information')} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="account-circle" size={20} color="#ccc" style={{ marginRight: 7 }} />
            <Text style={{color: '#ccc', fontSize: 20}}>Personal Information</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={{ marginRight: 7 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemPress('Login & Security')} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="admin-panel-settings" size={20} color="#ccc" style={{ marginRight: 7 }} />
            <Text style={{color: '#ccc', fontSize: 20}}>Login & Security</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={{ marginRight: 7 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemPress('Payments and payouts')} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="payments" size={20} color="#ccc" style={{ marginRight: 7 }} />
            <Text style={{color: '#ccc', fontSize: 20}}>Payments and payouts</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={{ marginRight: 7 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemPress('Taxes')} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="note" size={20} color="#ccc" style={{ marginRight: 7 }} />
            <Text style={{color: '#ccc', fontSize: 20}}>Taxes</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={{ marginRight: 7 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').height / 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigateButton: {
    backgroundColor: '#FFC107',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  navigateText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PrivateProfileScreen;

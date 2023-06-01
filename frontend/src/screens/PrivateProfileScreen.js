import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, Dimensions, Pressable } from 'react-native';
import Line from '../container/Line';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './Styles/PrivateStyles';
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
    <View style={styles.container}>
      <Text style={styles.heading}>프로필</Text>
      <Line style={styles.line} />
      <View style={styles.profileInfo}>
        <MaterialIcons name="account-circle" size={60} color="gray" style={styles.profileIcon} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileText}>주최자</Text>
          <Text style={styles.profileText}>Show profile</Text>
        </View>
      </View>
      <View style={styles.partyInfoContainer}>
        <Text style={styles.partyInfoText}>참석 예정</Text>
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
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsText}>세팅</Text>

        <TouchableOpacity onPress={() => onItemPress('Personal Information')} style={styles.settingsItem}>
          <View style={styles.itemTextContainer}>
            <MaterialIcons name="account-circle" size={20} color="#ccc" style={styles.itemIcon} />
            <Text style={styles.itemText}>Personal Information</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={styles.itemIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemPress('Login & Security')} style={styles.settingsItem}>
          <View style={styles.itemTextContainer}>
            <MaterialIcons name="admin-panel-settings" size={20} color="#ccc" style={styles.itemIcon} />
            <Text style={styles.itemText}>Login & Security</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={styles.itemIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemPress('Payments and payouts')} style={styles.settingsItem}>
          <View style={styles.itemTextContainer}>
            <MaterialIcons name="payments" size={20} color="#ccc" style={styles.itemIcon} />
            <Text style={styles.itemText}>Payments and payouts</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={styles.itemIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onItemPress('Taxes')} style={styles.settingsItem}>
          <View style={styles.itemTextContainer}>
            <MaterialIcons name="note" size={20} color="#ccc" style={styles.itemIcon} />
            <Text style={styles.itemText}>Taxes</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={styles.itemIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default PrivateProfileScreen;

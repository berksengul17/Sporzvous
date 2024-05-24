import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { router, useNavigation } from "expo-router";

const eventData = [
  {
    id: "1",
    name: "Esenyurt Hailsaha",
    sport: "Football",
    host: "Çağan Özsir",
    date: "20.04.2024",
    status: "finished"
  },
  {
    id: "2",
    name: "Tennis",
    sport: "Tennis",
    host: "Emre Erol",
    date: "05.05.2024",
    status: "onGoing"
  },
  {
    id: "3",
    name: "Berk’s Tennis",
    sport: "Tennis",
    host: "Berk Şengül",
    date: "07.05.2024",
    status: "onGoing"
  },
  {
    id: "4",
    name: "Bornova Futbol",
    sport: "Football",
    host: "Emre Erol",
    date: "12.05.2024",
    status: "finished"
  },
  // Add more events here
];
function EventStatus(event) {
  const status = event.status;
  if (
    status == "finished"
  ) {    return <Entypo name="check" size={24} color="black" style={styles.check} />;  }  
  return <MaterialCommunityIcons name="timer-sand-complete" size={24} color="black" backgroundColor="#CCAA0E" style={styles.sandwatch} />;}

const Status = ({ event }) => {
  return (
    EventStatus(event)
  )
}
const EventItem = ({ event }) => {
  const navigation = useNavigation();

  return (

  <View style={styles.eventContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('ratePlayersFinished', { event })} style={styles.eventRow}>
      <View style={styles.labelView}>
        <Text style={styles.eventName}>{event.name}</Text>
      </View>
      <View style={styles.labelView}>
        <Text style={styles.eventSport}>{event.sport}</Text>
      </View>
      <Status event={event}/>
    </TouchableOpacity>
    <View style={styles.eventRow}>
      <View style={styles.labelView}>
        <Text style={styles.eventHost}>{event.host}</Text>
      </View>
      <View style={styles.labelView}>
        <Text style={styles.eventDate}>{event.date}</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity>
          <Feather name="upload" size={24} color="#FF5C00" style={{marginRight: '10%'}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="delete" size={24} color="#FF5C00"  />
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );
};

export default function MyEvents() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6F6F6F" />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            placeholderTextColor={"#6F6F6F"}
          />
        </View>
        <TouchableOpacity>
          <AntDesign
            name="filter"
            size={40}
            color="#FF5C00"
            style={{ margin: 4 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={eventData}
        renderItem={({ item }) => <EventItem event={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.wave}>
        <Image source={require("../../assets/images/Waves.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },
  searchText: {
    marginLeft: 10,
    flex: 1,
  },
  eventContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  eventName: {
    color: "#6F6F6F",
  },
  eventSport: {
    color: "#6F6F6F",
  },
  eventHost: {
    color: "#6F6F6F",
  },
  eventDate: {
    color: "#6F6F6F",
  },
  sandwatch: {
    borderWidth: 1,
    backgroundColor: "#FAFF00",
    borderColor: "#FAFF00",
    borderRadius: 6,
    overflow: 'hidden',
    padding: 2,
  },
  check: {
    borderWidth: 1,
    backgroundColor: "#00FF94",
    borderColor: "#00FF94",
    borderRadius: 6,
    overflow: 'hidden',
    padding: 2,
  },
  labelView:{
    
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10

  },
  buttonView: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    
    
  },
  wave: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    resizeMode: "cover",
  },
});

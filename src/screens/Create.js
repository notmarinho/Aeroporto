import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';


//LB
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//CP
import { fonts } from '../commounStyles'
import Header from '../components/Create/Header';
import Airport from '../components/Create/Airport';
import Voo from '../components/Create/Voo';
import TipoAeronave from '../components/Create/TipoAeronave';
import TrechoVoo from '../components/Create/TrechoVoo';
import Aeronave from '../components/Create/Aeronave';
import Instancia from '../components/Create/Instancia';
import Pousar from '../components/Create/Pousar';
import Reserva from '../components/Create/Reserva';
import Tarifa from '../components/Create/Tarifa';

const Create = ({ navigation, route }) => {
  const { item, editObj } = route.params;
  const { api_name } = item;

  const handleComponent = () => {
    switch (api_name) {
      case 'aeroporto':
        return <Airport api_name={api_name} editObj={editObj} />
      case 'voo':
        return <Voo api_name={api_name} editObj={editObj} />
      case 'tipo':
        return <TipoAeronave api_name={api_name} editObj={editObj} />
      case 'aero':
        return <Aeronave api_name={api_name} editObj={editObj} />
      case 'instancia':
        return <Instancia api_name={api_name} editObj={editObj} />
      case 'trecho':
        return <TrechoVoo api_name={api_name} editObj={editObj} />
      case 'pousar':
        return <Pousar api_name={api_name} editObj={editObj} />
      case 'tarifa':
        return <Tarifa api_name={api_name} editObj={editObj} />
      case 'reserva':
        return <Reserva api_name={api_name} editObj={editObj} />
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title={`Criar ${item.label}`}
        onBackButtonPress={() => navigation.goBack()}
      />
      {handleComponent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  }
});

export default Create;


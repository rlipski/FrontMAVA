import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import AdvertisementInfo from '../components/AdvertisementInfo';
import { useGet} from '../hooks/useGet';

export default function AdvertisementsListScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const advertisements = useGet('/advertisement');
  function renderAdvertisementInfo({ item: advertisement }) {
    return <AdvertisementInfo advertisement={advertisement} onPress={() => { navigation.navigate('AdvertisementDetails', { id: advertisement.id })}} />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.advertisementsListContainer}
      data={advertisements}
      renderItem={renderAdvertisementInfo}
      keyExtractor={advertisement => `${advertisement.id}`}
    />
  );
}

const styles = StyleSheet.create({
  advertisementsListContainer: {
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
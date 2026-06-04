import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform, StatusBar, Image, TextInput } from 'react-native';

export const DATA_GUDANG = [
  { id: '1', namaBarang: 'Baut Hex M8', kategori: 'Fastener', stok: 150, lokasiRak: 'Rak A-01' },
  { id: '2', namaBarang: 'Oli Hidrolik Shell 5L', kategori: 'Lubricant', stok: 3, lokasiRak: 'Rak B-05' },
  { id: '3', namaBarang: 'Bearing SKF 6204', kategori: 'Sparepart', stok: 45, lokasiRak: 'Rak C-02' },
  { id: '4', namaBarang: 'Mur Ring 12', kategori: 'Fastener', stok: 200, lokasiRak: 'Rak A-02' },
  { id: '5', namaBarang: 'Van Belt Tipe M', kategori: 'Sparepart', stok: 12, lokasiRak: 'Rak C-05' },
  { id: '6', namaBarang: 'Gasket Sealant Tube', kategori: 'Chemical', stok: 4, lokasiRak: 'Rak B-02' },
  { id: '7', namaBarang: 'Kabel Selang Pneumatik', kategori: 'Pneumatic', stok: 80, lokasiRak: 'Rak D-01' },
  { id: '8', namaBarang: 'Fitting Logam L', kategori: 'Pneumatic', stok: 25, lokasiRak: 'Rak D-03' },
  { id: '9', namaBarang: 'Grease Stempet 1KG', kategori: 'Lubricant', stok: 15, lokasiRak: 'Rak B-01' },
  { id: '10', namaBarang: 'Saklar Limit Switch', kategori: 'Electrical', stok: 7, lokasiRak: 'Rak E-04' }
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  const dataTerfilter = DATA_GUDANG.filter((item) => 
    item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dataTampil = isSorted 
    ? [...dataTerfilter].sort((a, b) => a.namaBarang.localeCompare(b.namaBarang))
    : dataTerfilter;

  const renderItem = ({ item }) => {
    const isKritis = item.stok < 5;

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { itemData: item })}
      >
        <View>
          <Text style={styles.namaBarang}>{item.namaBarang}</Text>
          <Text style={styles.subText}>{item.kategori} | {item.lokasiRak}</Text>
        </View>
        <Text style={[styles.stokText, isKritis ? styles.textKritis : styles.textNormal]}>
          Stok: {item.stok}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image 
          source={require('../assets/Logo Teknik Industri UNY.png')} 
          style={styles.logoCompany} 
        />
        <View style={styles.headerTextWrapper}>
          <Text style={styles.companyTitle}>PT. Logistik Nusantara</Text>
          <Text style={styles.appSubTitle}>Warehouse Locator App</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Cari nama barang di gudang..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <TouchableOpacity 
        style={styles.btnSort} 
        onPress={() => setIsSorted(!isSorted)}
      >
        <Text style={styles.btnSortText}>
          {isSorted ? "Tampilkan Urutan Asli" : "Urutkan Alfabet (A-Z)"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={dataTampil}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 15, 
    paddingHorizontal: 16 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1
  },
  logoCompany: {
    width: 45,
    height: 45,
    marginRight: 12,
    resizeMode: 'contain'
  },
  headerTextWrapper: {
    flex: 1
  },
  companyTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1e3799'
  },
  appSubTitle: { 
    fontSize: 12, 
    color: '#57606f',
    fontWeight: '600',
    marginTop: 2 
  },
  searchBar: { 
    height: 45, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    backgroundColor: '#fff', 
    marginBottom: 12 
  },
  btnSort: { 
    backgroundColor: '#3498db', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 15, 
    alignItems: 'center',
    elevation: 1
  },
  btnSortText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  card: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 8, 
    marginVertical: 6, 
    elevation: 2 
  },
  namaBarang: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  subText: { 
    color: '#7f8c8d', 
    fontSize: 13, 
    marginTop: 4 
  },
  stokText: { 
    fontSize: 14, 
    fontWeight: 'bold'
  },
  textNormal: { 
    color: '#27ae60' 
  },
  textKritis: { 
    color: '#e74c3c' 
  }
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { itemData } = route.params;
  const [stokLokal, setStokLokal] = useState(itemData.stok);

  const tambahStok = () => {
    setStokLokal(stokLokal + 1);
  };

  const kurangStok = () => {
    if (stokLokal > 0) {
      setStokLokal(stokLokal - 1);
    }
  };

  const isKritis = stokLokal < 5;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.card, isKritis ? styles.cardKritis : styles.cardNormal]}>
        <Text style={styles.label}>NAMA MATERIAL</Text>
        <Text style={styles.value}>{itemData.namaBarang}</Text>

        <Text style={styles.label}>KATEGORI BARANG</Text>
        <Text style={styles.value}>{itemData.kategori}</Text>

        <Text style={styles.label}>ZONA LOKASI RAK</Text>
        <Text style={styles.value}>{itemData.lokasiRak}</Text>

        <Text style={styles.label}>KUANTITAS PERSIDIAAN GUDANG</Text>
        <Text style={[styles.valueStok, isKritis ? styles.textKritis : styles.textNormal]}>
          {stokLokal} Unit {isKritis && "(STOK KRITIS!)"}
        </Text>
      </View>

      {isKritis && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
             PERINGATAN KRITIS: Sisa stok berada di bawah ambang batas minimum keselamatan! Segera ajukan permohonan pengadaan material baru.
          </Text>
        </View>
      )}

      <View style={styles.controlContainer}>
        <TouchableOpacity style={styles.buttonKurang} onPress={kurangStok}>
          <Text style={styles.buttonControlText}>− Kurangi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTambah} onPress={tambahStok}>
          <Text style={styles.buttonControlText}>+ Tambah</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonBackText}>KEMBALI KE BERANDA</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20
  },
  card: { 
    padding: 22, 
    borderRadius: 12, 
    elevation: 3, 
    marginBottom: 20 
  },
  cardNormal: { 
    backgroundColor: '#fff', 
    borderColor: '#e0e0e0', 
    borderWidth: 1 
  },
  cardKritis: { 
    backgroundColor: '#fff5f5', 
    borderColor: '#e74c3c', 
    borderWidth: 2 
  },
  label: { 
    fontSize: 11, 
    color: '#95a5a6', 
    marginTop: 10, 
    fontWeight: 'bold', 
    letterSpacing: 0.5 
  },
  value: { 
    fontSize: 18, 
    color: '#2c3e50', 
    fontWeight: '600', 
    marginTop: 2 
  },
  valueStok: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 4 
  },
  textNormal: { 
    color: '#27ae60' 
  },
  textKritis: { 
    color: '#e74c3c' 
  },
  alertBox: {
    backgroundColor: '#ffdddd',
    borderColor: '#f44336',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20
  },
  alertText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15
  },
  buttonKurang: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1
  },
  buttonTambah: {
    flex: 1,
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1
  },
  buttonControlText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonBack: {
    backgroundColor: '#1e3799',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonBackText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5
  }
});
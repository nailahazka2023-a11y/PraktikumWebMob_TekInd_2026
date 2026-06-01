import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function TambahScreen({ navigation }) {
  const [nama, setNama] = useState('');
  const [kode, setKode] = useState('');
  const [lokasi, setLokasi] = useState('');

  const handleSimpan = () => {
    if (nama.trim() === '' || kode.trim() === '' || lokasi.trim() === '') {
      Alert.alert(
        "Form Belum Lengkap",
        "Harus isi semua data terlebih dahulu baru bisa simpan form!",
        [{ text: "OK" }]
      );
      return;
    }

    navigation.navigate('Home', {
      newBarang: {
        id: Math.random().toString(),
        nama: nama,
        kode: kode.toUpperCase(),
        status: 'Pending',
        gambar: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=600',
        standar: [
          `Lokasi Penyimpanan: ${lokasi}`,
          'Dimensi komponen eksternal harus memenuhi lembar spesifikasi cetak.',
          'Bebas dari kontaminasi zat asing, oli abrasif, dan deformasi mikro.',
          'Lolos inspeksi visual menyeluruh di bawah pencahayaan 1000 lux.'
        ]
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Tambah Barang Baru</Text>

      <Text style={styles.label}>Nama Barang</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nama komponen..." 
        placeholderTextColor="#94a3b8"
        value={nama}
        onChangeText={setNama}
      />

      <Text style={styles.label}>Kode Serial / SKU</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Contoh: PT-042, BR-015" 
        placeholderTextColor="#94a3b8"
        value={kode}
        onChangeText={setKode}
      />

      <Text style={styles.label}>Lokasi Penyimpanan / Rak</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Contoh: Rak A-1, Gudang Utama" 
        placeholderTextColor="#94a3b8"
        value={lokasi}
        onChangeText={setLokasi}
      />

      <TouchableOpacity style={styles.btnSimpan} onPress={handleSimpan}>
        <Text style={styles.btnSimpanText}>SIMPAN BARANG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#1e293b' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748b', marginTop: 15, marginBottom: 6, textTransform: 'uppercase' },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 12, borderRadius: 8, fontSize: 16, color: '#1e293b' },
  btnSimpan: { backgroundColor: '#1e293b', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  btnSimpanText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default TambahScreen;
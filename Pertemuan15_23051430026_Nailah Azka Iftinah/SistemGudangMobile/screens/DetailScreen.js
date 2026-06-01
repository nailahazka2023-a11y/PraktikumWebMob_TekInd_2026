import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

function DetailScreen({ route, navigation }) {
  const { itemData } = route.params;
  const [selectedStatus, setSelectedStatus] = useState(itemData.status);

  const handleFinish = () => {
    navigation.navigate('Home', {
      updatedId: itemData.id,
      status: selectedStatus
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: itemData.gambar }} 
        style={styles.itemImage}
      />
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Item Informasi</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nama:</Text>
          <Text style={styles.value}>{itemData.nama}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Serial:</Text>
          <Text style={styles.value}>{itemData.kode}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Standar Kualitas Teknis</Text>
        {itemData.standar.map((std, index) => (
          <Text key={index} style={styles.standardText}>• {std}</Text>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Keputusan Inspeksi</Text>
        <View style={styles.btnRow}>
          <TouchableOpacity 
            style={[styles.btnAction, selectedStatus === 'Lolos' && styles.btnActiveLolos]}
            onPress={() => setSelectedStatus('Lolos')}
          >
            <Text style={[styles.btnText, selectedStatus === 'Lolos' && styles.textWhite]}>LOLOS</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btnAction, selectedStatus === 'Gagal' && styles.btnActiveGagal]}
            onPress={() => setSelectedStatus('Gagal')}
          >
            <Text style={[styles.btnText, selectedStatus === 'Gagal' && styles.textWhite]}>GAGAL</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={handleFinish}>
          <Text style={styles.btnSubmitText}>SIMPAN HASIL INSPEKSI</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  itemImage: { width: '100%', height: 250, backgroundColor: '#e2e8f0' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e293b', marginBottom: 10, textTransform: 'uppercase' },
  infoRow: { flexDirection: 'row', marginBottom: 5 },
  label: { width: 60, color: '#64748b', fontWeight: '600' },
  value: { color: '#1e293b', fontWeight: 'bold', fontSize: 16 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 20 },
  standardText: { color: '#475569', fontSize: 15, marginBottom: 8, lineHeight: 22 },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  btnAction: { flex: 1, padding: 15, borderRadius: 8, borderWidth: 2, borderColor: '#e2e8f0', alignItems: 'center' },
  btnActiveLolos: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  btnActiveGagal: { backgroundColor: '#ef4444', borderColor: '#ef4444' },
  btnText: { fontWeight: 'bold', color: '#64748b' },
  textWhite: { color: '#fff' },
  btnSubmit: { backgroundColor: '#1e293b', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  btnSubmitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default DetailScreen;
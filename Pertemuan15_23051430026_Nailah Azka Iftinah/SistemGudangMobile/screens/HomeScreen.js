import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const INITIAL_QC_DATA = [
  { 
    id: '1', 
    nama: 'Body Panel Depan', 
    kode: 'BP-001', 
    status: 'Pending',
    gambar: 'https://res.cloudinary.com/demo/image/upload/w_1000,c_fill,ar_16:9,g_auto/car.jpg',
    standar: [
      'Bebas dari penyok, baret, atau cacat cetakan struktural.',
      'Ketebalan lapisan cat merata sesuai batas toleransi mil (μm).',
      'Keselarasan celah (gap) antar-panel maksimal 1.5mm.'
    ]
  },
  { 
    id: '2', 
    nama: 'Poros Transmisi', 
    kode: 'PT-042', 
    status: 'Pending',
    gambar: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
    standar: [
      'Presisi diameter dan kelurusan poros maksimun toleransi +/- 0.02mm.',
      'Bebas dari retak rambut internal (lolos uji Ultrasonic Testing).',
      'Kekerasan material memenuhi standar spesifikasi Rockwell (HRC).'
    ]
  },
  { 
    id: '3', 
    nama: 'Kelistrikan ECU', 
    kode: 'EC-099', 
    status: 'Pending',
    gambar: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600',
    standar: [
      'Nilai hambatan dan kontinuitas sirkuit 100% normal.',
      'Pin konektor lurus sempurna tanpa ada risiko korsleting.',
      'Lolos pengujian simulasi firmware dan pembacaan sensor.'
    ]
  },
  { 
    id: '4', 
    nama: 'Sistem Pengereman', 
    kode: 'BR-015', 
    status: 'Pending',
    gambar: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600',
    standar: [
      'Ketebalan piringan cakram (rotor) merata tanpa gelombang.',
      'Bebas kebocoran minyak pada segel caliper dan slang rem.',
      'Kampas rem terpasang presisi dengan koefisien gesek standar.'
    ]
  },
];

function HomeScreen({ navigation, route }) {
  const [items, setItems] = useState(INITIAL_QC_DATA);

  useEffect(() => {
    if (route.params?.updatedId) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === route.params.updatedId ? { ...item, status: route.params.status } : item
        )
      );
      navigation.setParams({ updatedId: undefined, status: undefined });
    }
  }, [route.params?.updatedId, route.params?.status]);

  useEffect(() => {
    if (route.params?.newBarang) {
      setItems(prevItems => [...prevItems, route.params.newBarang]);
      navigation.setParams({ newBarang: undefined });
    }
  }, [route.params?.newBarang]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { itemData: item })}
    >
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.itemKode}>{item.kode}</Text>
          <Text style={[styles.itemNama, item.status === 'Gagal' && styles.textGagal]}>
            {item.nama}
          </Text>
        </View>
        <View style={[styles.statusBadge, item.status === 'Lolos' ? styles.badgeLolos : item.status === 'Gagal' ? styles.badgeGagal : styles.badgePending]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.titleContainer}>
          <Image 
            source={require('../assets/Logo Teknik Industri UNY.png')} 
            style={styles.logoApp}
          />
          <Text style={styles.headerTitle}>QC INSPECTION SYSTEM</Text>
        </View>
        <View style={styles.identityBar}>
          <Text style={styles.identityText}>Inspector: Nailah Azka Iftinah | 23051430026</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.sectionHeading}>Daftar Inventaris QC</Text>
        <TouchableOpacity style={styles.btnAddItem} onPress={() => navigation.navigate('Tambah')}>
          <Text style={styles.btnAddItemText}>+ BARANG</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  headerBox: { backgroundColor: '#1e293b', padding: 20, paddingTop: 40 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  logoApp: { width: 40, height: 40, resizeMode: 'contain' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  identityBar: { backgroundColor: '#334155', marginTop: 12, padding: 8, borderRadius: 5 },
  identityText: { color: '#cbd5e1', fontSize: 12, textAlign: 'center', fontWeight: '600' },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20, marginBottom: 5 },
  sectionHeading: { fontSize: 15, fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' },
  btnAddItem: { backgroundColor: '#3b82f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  btnAddItemText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  listPadding: { padding: 15, paddingTop: 10 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 18, marginBottom: 12, elevation: 3 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemKode: { fontSize: 12, color: '#64748b', fontWeight: 'bold' },
  itemNama: { fontSize: 17, fontWeight: 'bold', color: '#334155', marginTop: 2 },
  textGagal: { color: '#ef4444' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, minWidth: 70, alignItems: 'center' },
  statusText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  badgePending: { backgroundColor: '#94a3b8' },
  badgeLolos: { backgroundColor: '#22c55e' },
  badgeGagal: { backgroundColor: '#ef4444' },
});

export default HomeScreen;
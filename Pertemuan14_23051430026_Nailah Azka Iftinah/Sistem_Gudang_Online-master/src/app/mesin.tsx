import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MesinProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <View style={styles.row}>
          <View style={styles.photoWrap}>
            <Image
              source={require('@/assets/images/Logo_MJ.png')}
              style={styles.photo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.content}>
            <ThemedText type="title" style={styles.name}>
              Mesin Bor
            </ThemedText>

            <View style={styles.metaBlock}>
              <ThemedText type="smallBold">Tahun Pembuatan</ThemedText>
              <ThemedText type="small">2020</ThemedText>
            </View>

            <View style={styles.metaBlock}>
              <ThemedText type="smallBold">Status</ThemedText>
              <ThemedText type="small">Aktif</ThemedText>
            </View>

            <View style={styles.metaBlock}>
              <ThemedText type="smallBold">Keterangan</ThemedText>
              <ThemedText type="small">
                Halaman detail mesin (untuk latihan/mini proyek).
              </ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  photoWrap: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 20,
    lineHeight: 26,
  },
  metaBlock: {
    gap: 2,
  },
});


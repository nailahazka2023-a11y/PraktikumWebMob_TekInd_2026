import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Breadcrumb } from '@/components/breadcrumb';



function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getCapacityStatus(percent: number) {
  const p = clamp(percent, 0, 100);
  if (p < 70) {
    return { label: 'AMAN', color: '#27ae60', borderColor: '#2ecc71' };
  }
  if (p < 90) {
    return {
      label: 'WASPADA',
      color: '#b97706',
      borderColor: '#f1c40f',
      badgeBg: '#fff3cd',
    };
  }
  return {
    label: 'KRITIS / PENUH',
    color: '#b71c1c',
    borderColor: '#c0392b',
    badgeBg: '#ffe4e6',
  };
}


type WarehouseCardProps = {
  title: string;
  capacityPercent: number;
  onPressDetail?: () => void;
  isFull?: boolean;
  stokTerakhirText: string; // contoh: "1.200/1.500 Unit"
  suhuText?: string; // contoh: "28°C"
  kelembabanText?: string; // contoh: "65%"
};

function WarehouseCard({
  title,
  capacityPercent,
  onPressDetail,
  isFull,
  stokTerakhirText,
  suhuText,
  kelembabanText,
}: WarehouseCardProps) {
  const status = getCapacityStatus(capacityPercent);
  const progressWidthPercent = clamp(capacityPercent, 0, 100);

  const content = (
    <View
      style={[
        styles.card,
        { borderLeftColor: status.borderColor },
        isFull ? styles.cardFull : null,
      ]}
    >
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View
          style={[
            styles.statusPill,
            { backgroundColor: status.badgeBg, borderColor: status.borderColor },
          ]}
        >
          <Text style={[styles.statusPillText, { color: status.color }]}>
            {isFull ? 'PENUH' : status.label}
          </Text>
        </View>
      </View>


      <Text style={styles.cardValue}>Kapasitas: {Math.round(capacityPercent)}%</Text>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressWidthPercent}%`,
              backgroundColor: status.color,
            },
          ]}
        />
      </View>

      {/* Bagian status / aksi */}
      <View style={styles.cardBottomRow}>
        {onPressDetail ? (
          <TouchableOpacity
            style={[styles.detailButton, { borderColor: status.color }]}
            onPress={onPressDetail}
          >
            <Text style={[styles.detailButtonText, { color: status.color }]}>
              TEKAN UNTUK DETAIL
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.fullIndicator}>
            <Text style={[styles.fullTriangle, { color: status.color }]}>⚠️</Text>
            <Text style={[styles.fullText, { color: status.color }]}>PENUH</Text>
          </View>

        )}
      </View>

      {/* Ringkasan tambahan */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>🧾 {stokTerakhirText}</Text>

        {/* Suhu & kelembaban (ikon konsisten) */}
        <View style={styles.envCorner}>
          {suhuText ? (
            <View style={styles.envItem}>
              <Text style={styles.envIcon}>🌡️</Text>
              <Text style={styles.envText}>{suhuText}</Text>
            </View>
          ) : null}
          {kelembabanText ? (
            <View style={styles.envItem}>
              <Text style={styles.envIcon}>💧</Text>
              <Text style={styles.envText}>{kelembabanText}</Text>
            </View>
          ) : null}
        </View>
      </View>

    </View>
  );

  return content;

}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Breadcrumb / Indikator Lokasi */}
      <View style={styles.breadcrumbWrap}>


        <Breadcrumb
          items={[
            { label: 'Home' },
            { label: 'Gudang A' },
            { label: 'Detail' },
          ]}
        />
      </View>

      {/* Bagian Konten Utama */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcomeText}>Selamat Datang, Operator!</Text>



        {/* (Grid siap ekspansi) */}
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <WarehouseCard
              title="Status Gudang A"
              capacityPercent={85}
              onPressDetail={() =>
                Alert.alert('Info', 'Membuka Detail Stok Gudang A...', [
                  {
                    text: 'Lihat Mesin',
                    onPress: () => {
                      // Untuk latihan/mini project: navigasi via expo-router ke /mesin
                      // eslint-disable-next-line @typescript-eslint/no-floating-promises
                      // @ts-expect-error - router tersedia pada runtime expo-router
                      globalThis?.__router?.push?.('/mesin');
                    },
                  },
                  { text: 'Tutup', style: 'cancel' },
                ])
              }


              stokTerakhirText="1.200/1.500 Unit"
              suhuText="28°C"
              kelembabanText="65%"
            />
          </View>

          <View style={styles.gridItem}>
            <WarehouseCard
              title="Status Gudang B"
              capacityPercent={95}
              isFull
              stokTerakhirText="1.450/1.500 Unit"
              suhuText="30°C"
              kelembabanText="70%"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const HEADER_OFFSET = 104;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  content: {

    padding: 20,
    // Offset untuk header app-tabs (sticky)
    paddingTop: HEADER_OFFSET,
  },

  breadcrumbWrap: {
    backgroundColor: '#f0f2f5',
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 6,
    zIndex: 1100,
  },




  welcomeText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },

  /* Grid */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '100%',
  },

  card: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    borderLeftWidth: 6,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3.84,
    elevation: 4,
  },

  cardFull: {
    backgroundColor: '#fff5f5',
  },

  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },



  statusPillText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  cardValue: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 10,
    fontWeight: '600',
  },


  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#ecf0f1',
    overflow: 'hidden',
    marginBottom: 12,
  },

  progressFill: {
    height: 10,
    borderRadius: 999,
  },

  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },

  detailButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  detailButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  fullIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e74c3c',
    backgroundColor: 'rgba(231, 76, 60, 0.06)',
  },

  fullTriangle: {
    fontSize: 14,
  },

  fullText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
  },

  summaryText: {
    fontSize: 12,
    color: '#34495e',
    fontWeight: '600',
  },

  envCorner: {
    alignItems: 'flex-end',
    gap: 6,
  },

  envItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  envIcon: {
    fontSize: 14,
    lineHeight: 16,
  },

  envText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
  },

});


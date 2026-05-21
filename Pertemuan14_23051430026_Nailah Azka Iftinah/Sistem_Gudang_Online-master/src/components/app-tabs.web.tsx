import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={styles.tabListContainer}>
      <View style={styles.headerOuter}>
        {/* Header ringkas 1 baris 3 kolom */}
        <ThemedView type="backgroundSelected" style={styles.headerRow}>
          {/* Kiri: Logo & Nama Aplikasi */}
          <View style={styles.leftBrand}>
            <ThemedText type="smallBold" style={styles.brandTitle}>
              PT. Manufaktur Jaya
            </ThemedText>
            <ThemedText type="small" style={styles.brandSubtitle}>
              Aplikasi Monitoring Gudang
            </ThemedText>
          </View>

          {/* Tengah: Navigasi (Home, Explore) */}
          <View style={styles.centerNav}>{props.children}</View>

          {/* Kanan: Profil & Docs */}
          <View style={styles.rightArea}>
            <View style={styles.profileArea}>
              <ThemedText type="smallBold" style={styles.profileName}>
                👤 Nailah
              </ThemedText>
              <ThemedText type="small" style={styles.profileNim}>
                23051430026
              </ThemedText>
            </View>

            <ExternalLink href="https://docs.expo.dev" asChild>
              <Pressable style={styles.externalPressable}>
                <ThemedText type="link">Docs</ThemedText>
                <SymbolView
                  tintColor={colors.text}
                  name={{ ios: 'arrow.up.right.square', web: 'link' }}
                  size={12}
                />
              </Pressable>
            </ExternalLink>
          </View>
        </ThemedView>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'sticky',
    top: 0,
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },



  headerOuter: {
    width: '100%',
    maxWidth: MaxContentWidth,
    borderRadius: Spacing.five,
    overflow: 'hidden',
  },

  headerRow: {
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2c3e50',
  },

  leftBrand: {
    flex: 1,
    gap: Spacing.half,
  },

  brandTitle: {
    color: '#ffffff',
  },

  brandSubtitle: {
    color: '#bdc3c7',
  },

  centerNav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Spacing.three,
  },

  profileArea: {
    gap: Spacing.half,
    alignItems: 'flex-end',
  },

  profileName: {
    textAlign: 'center',
    fontWeight: 700,

    fontSize: 12,
    lineHeight: 16,
  },

  profileNim: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,
    color: '#60646C',
  },

  docsArea: {
    flex: 1,
    alignItems: 'flex-end',
  },

  footer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
  },

  footerText: {
    color: '#60646C',
    textAlign: 'center',
  },

  pressed: {
    opacity: 0.7,
  },

  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },

  externalPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.half,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.one,
  },
});


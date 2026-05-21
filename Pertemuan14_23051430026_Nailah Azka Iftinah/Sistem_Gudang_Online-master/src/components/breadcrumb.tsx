import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type BreadcrumbItem = {
  label: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: string;
};

export function Breadcrumb({
  items,
  separator = '>',
}: BreadcrumbProps) {
  return (
    <View style={styles.container}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <View key={`${item.label}-${idx}`} style={styles.part}>
            <Text style={[styles.text, isLast ? styles.textCurrent : null]}>
              {item.label}
            </Text>
            {!isLast ? (
              <Text style={styles.separator}>{` ${separator} `}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 0,
    marginBottom: 14,
    gap: 2,
    flexWrap: 'wrap',
  },
  part: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#bdc3c7',
  },
  textCurrent: {
    color: '#ffffff',
  },
  separator: {
    fontSize: 12,
    fontWeight: '600',
    color: '#bdc3c7',
  },
});


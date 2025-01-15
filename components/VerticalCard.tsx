import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ViewStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type CardVariant = 'footer' | 'overlay';

interface VerticalCardProps {
  title: string;
  subtitle?: string;
  footer?: string;
  image: ImageSourcePropType;
  variant?: CardVariant;
  onPress?: () => void;
  onBookmarkPress?: () => void;
  isBookmarked?: boolean;
  style?: ViewStyle;
}

export function VerticalCard({
  title,
  subtitle,
  footer,
  image,
  variant = 'footer',
  onPress,
  onBookmarkPress,
  isBookmarked = false,
  style,
}: VerticalCardProps) {
  const theme = useColorScheme() ?? 'light';

  const renderContent = () => {
    if (variant === 'footer') {
      return (
        <>
          <ThemedView style={styles.imageContainer}>
            <Image source={image} style={styles.image} resizeMode="cover" />
          </ThemedView>
          <ThemedView style={styles.footerContent}>
            <View style={styles.titleContainer}>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.title, styles.titleWithBookmark]}
                numberOfLines={2}
              >
                {title}
              </ThemedText>
              {onBookmarkPress && (
                <TouchableOpacity
                  onPress={onBookmarkPress}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <IconSymbol
                    name={isBookmarked ? 'bookmark.fill' : 'bookmark'}
                    size={20}
                    weight="medium"
                    color={
                      theme === 'light'
                        ? Colors.light.icon
                        : Colors.dark.icon
                    }
                  />
                </TouchableOpacity>
              )}
            </View>
            {subtitle && (
              <ThemedText type="default" style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </ThemedText>
            )}
            {footer && (
              <ThemedText type="default" style={styles.footer} numberOfLines={1}>
                {footer}
              </ThemedText>
            )}
          </ThemedView>
        </>
      );
    }

    return (
      <>
        <Image source={image} style={styles.fullImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', '#CFCFCD']}
          style={styles.gradient}
        />
        <View style={styles.overlayContent}>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.title, styles.overlayTitle]}
            numberOfLines={2}
          >
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              type="default"
              style={[styles.subtitle, styles.overlayText]}
              numberOfLines={1}
            >
              {subtitle}
            </ThemedText>
          )}
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === 'overlay' && styles.overlayContainer,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overlayContainer: {
    height: 320,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
   
    marginBottom: 4,
  },
  titleWithBookmark: {
    flex: 1,
  },
  footerContent: {
    padding: 12,
    backgroundColor:'#CFCFCD',
  },
  overlayContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: "563540",
  },
  overlayTitle: {
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.8,
    color: "563540",
  },
  overlayText: {
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    
  },
  footer: {
    fontSize: 12,
    opacity: 0.6,
    color: "563540",
  },
});

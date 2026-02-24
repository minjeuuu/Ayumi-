import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  language: string;
  language_code: string;
}

interface Font {
  id: string;
  name: string;
  family: string;
}

interface HighlightColor {
  id: string;
  name: string;
  hex_color: string;
  rgba: string;
}

export default function BibleReaderScreen() {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentBook, setCurrentBook] = useState('John');
  const [currentChapter, setCurrentChapter] = useState(3);
  const [currentVersion, setCurrentVersion] = useState<BibleVersion>({
    id: 'esv',
    name: 'English Standard Version',
    abbreviation: 'ESV',
    language: 'English',
    language_code: 'en',
  });

  const [versions, setVersions] = useState<BibleVersion[]>([]);
  const [fonts, setFonts] = useState<Font[]>([]);
  const [colors, setColors] = useState<HighlightColor[]>([]);
  
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [highlights, setHighlights] = useState<{[key: number]: string}>({});
  
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  useEffect(() => {
    loadBibleVersions();
    loadFonts();
    loadColors();
  }, []);

  useEffect(() => {
    loadChapter();
  }, [currentBook, currentChapter, currentVersion]);

  const loadBibleVersions = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/bible/versions`);
      const data = await response.json();
      setVersions(data.versions);
    } catch (error) {
      console.error('Error loading versions:', error);
    }
  };

  const loadFonts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/fonts`);
      const data = await response.json();
      setFonts(data.fonts);
      setSelectedFont(data.fonts[0]);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  };

  const loadColors = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/colors`);
      const data = await response.json();
      setColors(data.colors);
    } catch (error) {
      console.error('Error loading colors:', error);
    }
  };

  const loadChapter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/bible/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book: currentBook,
          chapter: currentChapter,
          version: currentVersion.id.toUpperCase(),
        }),
      });
      const data = await response.json();
      setVerses(data.verses || []);
    } catch (error) {
      console.error('Error loading chapter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVersePress = (verseNumber: number) => {
    setSelectedVerse(verseNumber);
    setShowColorModal(true);
  };

  const handleColorSelect = (color: HighlightColor) => {
    if (selectedVerse) {
      setHighlights({ ...highlights, [selectedVerse]: color.rgba });
    }
    setShowColorModal(false);
    setSelectedVerse(null);
  };

  const nextChapter = () => {
    setCurrentChapter(currentChapter + 1);
  };

  const previousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const renderVerse = (verse: BibleVerse) => {
    const highlightColor = highlights[verse.verse];
    
    return (
      <TouchableOpacity
        key={verse.verse}
        onPress={() => handleVersePress(verse.verse)}
        style={[
          styles.verseContainer,
          highlightColor && { backgroundColor: highlightColor },
        ]}
      >
        <Text style={styles.verseNumber}>{verse.verse}</Text>
        <Text style={[styles.verseText, { fontSize }]}>
          {verse.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {currentBook} {currentChapter}
        </Text>
        <Text style={styles.headerSubtitle}>{currentVersion.abbreviation}</Text>
      </View>

      {/* Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowVersionModal(true)}
        >
          <Ionicons name="book-outline" size={20} color="#4A5568" />
          <Text style={styles.toolbarButtonText}>Version</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowFontModal(true)}
        >
          <Ionicons name="text-outline" size={20} color="#4A5568" />
          <Text style={styles.toolbarButtonText}>Font</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setFontSize(Math.max(12, fontSize - 2))}
        >
          <Ionicons name="remove-circle-outline" size={20} color="#4A5568" />
        </TouchableOpacity>

        <Text style={styles.fontSizeText}>{fontSize}</Text>

        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setFontSize(Math.min(24, fontSize + 2))}
        >
          <Ionicons name="add-circle-outline" size={20} color="#4A5568" />
        </TouchableOpacity>
      </View>

      {/* Bible Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading Scripture...</Text>
        </View>
      ) : (
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {verses.map((verse) => renderVerse(verse))}
        </ScrollView>
      )}

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentChapter === 1 && styles.navButtonDisabled]}
          onPress={previousChapter}
          disabled={currentChapter === 1}
        >
          <Ionicons name="chevron-back" size={24} color={currentChapter === 1 ? '#CBD5E0' : '#2563EB'} />
          <Text style={[styles.navButtonText, currentChapter === 1 && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={nextChapter}>
          <Text style={styles.navButtonText}>Next</Text>
          <Ionicons name="chevron-forward" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Version Modal */}
      <Modal
        visible={showVersionModal}
        animationType="slide"
        onRequestClose={() => setShowVersionModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Bible Version</Text>
            <TouchableOpacity onPress={() => setShowVersionModal(false)}>
              <Ionicons name="close" size={28} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={versions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.listItem,
                  item.id === currentVersion.id && styles.listItemSelected,
                ]}
                onPress={() => {
                  setCurrentVersion(item);
                  setShowVersionModal(false);
                }}
              >
                <View>
                  <Text style={styles.listItemTitle}>{item.name}</Text>
                  <Text style={styles.listItemSubtitle}>
                    {item.abbreviation} - {item.language}
                  </Text>
                </View>
                {item.id === currentVersion.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                )}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* Font Modal */}
      <Modal
        visible={showFontModal}
        animationType="slide"
        onRequestClose={() => setShowFontModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Font</Text>
            <TouchableOpacity onPress={() => setShowFontModal(false)}>
              <Ionicons name="close" size={28} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={fonts.slice(0, 50)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.listItem,
                  item.id === selectedFont?.id && styles.listItemSelected,
                ]}
                onPress={() => {
                  setSelectedFont(item);
                  setShowFontModal(false);
                }}
              >
                <Text style={[styles.listItemTitle, { fontFamily: item.family }]}>
                  {item.name}
                </Text>
                {item.id === selectedFont?.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                )}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* Color Modal */}
      <Modal
        visible={showColorModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowColorModal(false)}
      >
        <View style={styles.colorModalOverlay}>
          <View style={styles.colorModalContent}>
            <Text style={styles.colorModalTitle}>Select Highlight Color</Text>
            <View style={styles.colorGrid}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  style={[styles.colorOption, { backgroundColor: color.hex_color }]}
                  onPress={() => handleColorSelect(color)}
                >
                  <Text style={styles.colorOptionText}>{color.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.colorModalClose}
              onPress={() => setShowColorModal(false)}
            >
              <Text style={styles.colorModalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  toolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  toolbarButtonText: {
    fontSize: 12,
    color: '#4A5568',
  },
  fontSizeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
  verseNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    marginRight: 8,
    marginTop: 2,
    minWidth: 24,
  },
  verseText: {
    flex: 1,
    lineHeight: 24,
    color: '#1F2937',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  navButtonTextDisabled: {
    color: '#CBD5E0',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  listItemSelected: {
    backgroundColor: '#EFF6FF',
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  colorModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  colorModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  colorOption: {
    width: 80,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  colorOptionText: {
    fontSize: 10,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
  },
  colorModalClose: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  colorModalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});

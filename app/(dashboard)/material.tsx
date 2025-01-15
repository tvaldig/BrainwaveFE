import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function MaterialPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <Text style={styles.quizTitle}>Quiz: Modul 1 Introduction to Python</Text>

      <View style={styles.quizContainer}>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.infoValue}>Lorem ipsum dolor</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.infoValue}>23 Days</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.infoValue}>
              Lorem ipsum dolor sit amet consectetur. Leo est molestie.
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Image
                source={require('../../assets/images/Moduls.png')}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>Moduls: 8</Text>
            </View>
            <View style={styles.stat}>
              <Image
                source={require('../../assets/images/Rating.png')}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>Rating: 4.9</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Image
                source={require('../../assets/images/Viewers.png')}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>Viewers: 12.2K</Text>
            </View>
            <View style={styles.stat}>
              <Image
                source={require('../../assets/images/TotalQuestions.png')}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>Total Questions: 1000</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.pythonSection}>
        <Text style={styles.sectionTitle}>Apa itu Python?</Text>
        <Text style={styles.sectionText}>
          Python adalah bahasa pemrograman tingkat tinggi yang mudah dipelajari dan fleksibel, digunakan
          dalam banyak bidang, termasuk web, IoT, game, dan aplikasi desktop. Python cocok bagi pemula
          karena struktur sintaksnya sederhana.
        </Text>
        
        <Text style={styles.sectionTitle}>Kenapa Belajar Python?</Text>
        <Text style={styles.sectionText}>
          Python terkenal karena kemudahan dan keefektifannya. Banyak perusahaan besar menggunakannya,
          dan bahasanya sangat sederhana, memungkinkan pemula cepat memahami cara kerjanya.
        </Text>

        <Text style={styles.sectionTitle}>Persiapan Alat</Text>
        <Text style={styles.sectionText}>
          Alat utama yang diperlukan adalah interpreter Python dan text editor atau IDE. Artikel ini memberikan instruksi instalasi Python untuk pengguna Linux dan Windows, serta pilihan untuk menggunakan versi 2 atau 3.
        </Text>

        <Text style={styles.sectionTitle}>Mode Interaktif Python</Text>
        <Text style={styles.sectionText}>
          Mode interaktif (REPL) memungkinkan pengguna untuk menulis dan menjalankan kode secara langsung. Mode ini memfasilitasi percobaan, uji coba fungsi, dan eksplorasi modul. Dengan bantuan fungsi dir() dan help(), pengguna dapat menjelajahi berbagai modul dan fungsinya, seperti modul math.
        </Text>

        <Text style={styles.sectionTitle}>Menulis Skrip Python</Text>
        <Text style={styles.sectionText}>
          Panduan ini juga menjelaskan cara membuat skrip Python sederhana, menyimpannya, dan menjalankannya melalui terminal.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#563540',
    marginBottom: 12,
    textAlign: 'left',
  },
  quizContainer: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#563540',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#563540',
    flex: 2,
    textAlign: 'right',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#563540',
    marginVertical: 8,
  },
  statsGrid: {
    marginTop: 0,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
    width: '48%',
  },
  statIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  statText: {
    fontSize: 12,
    color: '#563540',
    textAlign: 'center',
  },
  pythonSection: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#563540',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#563540',
    marginBottom: 12,
  },
});

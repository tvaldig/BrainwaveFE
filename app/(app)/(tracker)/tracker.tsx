import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function TrackerPage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(9); 
  const [currentYear, setCurrentYear] = useState<number>(2024);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderCalendarDates = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const startDay = firstDayOfMonth(currentMonth, currentYear);
    const calendar = [];
  
    for (let i = 0; i < startDay; i++) {
      calendar.push(<View key={`empty-${i}`} style={styles.dateBox} />);
    }
  
    for (let date = 1; date <= totalDays; date++) {
      calendar.push(
        <TouchableOpacity
          key={date}
          style={[styles.dateBox, selectedDate === date && styles.activeDateBox]}
          onPress={() => handleDateClick(date)}
        >
          <Text style={[styles.dateText, selectedDate === date && styles.activeDateText]}>{date}</Text>
        </TouchableOpacity>
      );
    }
  
    const totalSlots = startDay + totalDays; 
    const extraSlots = 7 - (totalSlots % 7); 
    if (extraSlots < 7) { 
      for (let i = 0; i < extraSlots; i++) {
        calendar.push(<View key={`empty-end-${i}`} style={styles.dateBox} />);
      }
    }
  
    return calendar;
  };
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Timotius Vivaldi's Tracker</Text>
      <View style={styles.calendarContainer}>
        <View style={styles.monthNavigation}>
          <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.month}>{`${monthNames[currentMonth]} ${currentYear}`}</Text>
          <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarGrid}>
          {['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'].map((day, index) => (
            <Text key={index} style={styles.dayHeader}>{day}</Text>
          ))}
          {renderCalendarDates()}
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'All' && styles.activeTab]}
          onPress={() => handleTabChange('All')}
        >
          <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Today' && styles.activeTab]}
          onPress={() => handleTabChange('Today')}
        >
          <Text style={[styles.tabText, activeTab === 'Today' && styles.activeTabText]}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButtonBox}>
          <View style={styles.iconButton}>
            <Image source={require('../../../assets/images/Dates.png')} style={styles.icon} />
            <Text style={styles.iconText}>Dates</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButtonBox}>
          <View style={styles.iconButton}>
            <Image source={require('../../../assets/images/Filter.png')} style={styles.icon} />
            <Text style={styles.iconText}>Filter</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tracker List */}
      {[1, 2, 3, 4, 5].map((item, index) => (
        <View key={index} style={styles.trackerItem}>
          <View style={styles.dateSection}>
            <Text style={styles.dateNumber}>3</Text>
            <Text style={styles.dateMonth}>OCT</Text>
            <Text style={styles.dateMonth}>2024</Text>
          </View>
          <View style={styles.detailsSection}>
            <Text style={styles.taskTitle}>Computational Thinking - Introduction to Python</Text>
            <View style={styles.infoRow}>
              <Image source={require('../../../assets/images/Time.png')} style={styles.infoIcon} />
              <Text style={styles.infoText}>16.00 - 20.00 WIB</Text>
            </View>
            <View style={styles.infoRow}>
              <Image source={require('../../../assets/images/TotalModuls.png')} style={styles.infoIcon} />
              <Text style={styles.infoText}>5 Moduls</Text>
            </View>
          </View>
          <View style={styles.actionSection}>
            <View style={[styles.statusBadge, index % 2 === 0 ? styles.doneBadge : styles.incompleteBadge]}>
              <Text style={styles.statusText}>{index % 2 === 0 ? 'Done' : 'Incomplete'}</Text>
            </View>
            <TouchableOpacity style={styles.studyButton}>
              <Image source={require('../../../assets/images/StudyNow.png')} style={styles.studyIcon} />
              <Text style={styles.studyText}>Study Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#563540',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  calendarContainer: {
    backgroundColor: '#563540',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  month: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  navButton: {
    padding: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  dateBox: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  activeDateBox: {
    backgroundColor: '#cfcfcd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
  },
  activeDateText: {
    color: '#563540',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#EDEDED',
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#563540',
  },
  tabText: {
    fontSize: 14,
    color: '#A3A3A3',
  },
  activeTabText: {
    color: '#563540',
    fontWeight: 'bold',
  },
  iconButtonBox: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#563540',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  iconText: {
    fontSize: 12,
    color: '#fff',
  },
  trackerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  dateSection: {
    alignItems: 'center',
    marginRight: 12,
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#563540',
  },
  dateMonth: {
    fontSize: 12,
    color: '#563540',
  },
  detailsSection: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#563540',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#563540',
    marginRight: 16,
  },
  actionSection: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  doneBadge: {
    backgroundColor: '#4CAF50',
  },
  incompleteBadge: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  studyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  studyIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  studyText: {
    fontSize: 12,
    color: '#563540',
    fontWeight: 'bold',
  },
});

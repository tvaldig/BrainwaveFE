import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Circle, Path, G } from "react-native-svg";

interface StatCard {
  title: string;
  value: number | string;
  change: string;
  color?: string;
}

interface ChartData {
  date: string;
  current: number;
  previous: number;
}

interface TaskStat {
  label: string;
  value: number;
  color: string;
}

export default function EvaluationScreen() {
  const statCards: StatCard[] = [
    {
      title: "Total Moduls",
      value: 12,
      change: "+10% than last month",
    },
    {
      title: "Average Grade",
      value: 87.5,
      change: "+5% than last month",
    },
    {
      title: "Total Correct",
      value: 87,
      change: "+15% than last month",
    },
    {
      title: "Average Module",
      value: "22 Moduls/month",
      change: "+10% than last month",
    },
  ];

  const chartData: ChartData[] = [
    { date: "Jun 12", current: 110, previous: 90 },
    { date: "Jun 13", current: 85, previous: 95 },
    { date: "Jun 14", current: 80, previous: 45 },
    { date: "Jun 15", current: 105, previous: 80 },
  ];

  const taskStats: TaskStat[] = [
    { label: "Correct Answer", value: 87, color: "#6C2E75" },
    { label: "Wrong Answer", value: 12, color: "#9B51E0" },
    { label: "Not Answered", value: 4, color: "#D5B7E3" },
  ];

  const renderDonutChart = () => {
    const size = 120;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    
    let startAngle = 0;
    const total = taskStats.reduce((acc, stat) => acc + stat.value, 0);

    return (
      <Svg height={size} width={size}>
        <G transform={`translate(${center},${center})`}>
          {taskStats.map((stat, index) => {
            const percentage = stat.value / total;
            const angle = percentage * 360;
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            // Calculate coordinates
            const x1 = radius * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = radius * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = radius * Math.cos((startAngle + angle - 90) * Math.PI / 180);
            const y2 = radius * Math.sin((startAngle + angle - 90) * Math.PI / 180);

            const path = `
              M ${x1} ${y1}
              A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
            `;

            const arc = (
              <Path
                key={index}
                d={path}
                fill="none"
                stroke={stat.color}
                strokeWidth={strokeWidth}
              />
            );

            startAngle += angle;
            return arc;
          })}
          <Circle r={radius - strokeWidth / 2} fill="white" />

        </G>
      </Svg>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Evaluation & Progress Report</Text>
      
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statTitle}>{stat.title}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statChange}>{stat.change}</Text>
          </View>
        ))}
      </View>

      {/* Statistics Chart */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Statistic</Text>
          <View style={styles.periodTabs}>
            <Text style={[styles.periodTab, styles.periodTabActive]}>Week</Text>
            <Text style={styles.periodTab}>Month</Text>
            <Text style={styles.periodTab}>Year</Text>
          </View>
        </View>

        <LineChart
          data={{
            labels: chartData.map(data => data.date),
            datasets: [
              {
                data: chartData.map(data => data.current),
                color: () => '#6C5CE7',
              },
              {
                data: chartData.map(data => data.previous),
                color: () => '#A8A5CE',
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Bottom Cards Container */}
      <View style={styles.bottomCardsContainer}>
        {/* Tasks Card */}
        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Tasks</Text>
          <View style={styles.taskContent}>
            <View style={styles.donutChart}>
              {renderDonutChart()}
            </View>
            <View style={styles.taskStats}>
              {taskStats.map((stat, index) => (
                <View key={index} style={styles.taskStatRow}>
                  <View style={[styles.taskStatDot, { backgroundColor: stat.color }]} />
                  <Text style={styles.taskStatLabel}>{stat.label}</Text>
                  <Text style={styles.taskStatValue}>{stat.value} Questions</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Computational Card */}
        <View style={styles.computationalCard}>
          <Text style={styles.cardTitle}>Computational</Text>
          <View style={styles.moduleInfo}>
            <Text style={styles.moduleTitle}>21 Moduls Left</Text>
            <Text style={styles.moduleSubtitle}>70% from last month</Text>
          </View>
          <View style={styles.progressBars}>
            {[0.8, 0.6, 0.4].map((progress, index) => (
              <View key={index} style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#00B087',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  periodTabs: {
    flexDirection: 'row',
  },
  periodTab: {
    marginLeft: 16,
    color: '#666',
  },
  periodTabActive: {
    color: '#6C5CE7',
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  bottomCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '48%',
  },
  computationalCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '48%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskContent: {
    alignItems: 'center',
  },
  donutChart: {
    marginBottom: 16,
  },
  taskStats: {
    width: '100%',
  },
  taskStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  taskStatLabel: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  taskStatValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  moduleInfo: {
    marginBottom: 16,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  moduleSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  progressBars: {
    gap: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6C2E75',
    borderRadius: 4,
  },
});
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Circle, Path } from "react-native-svg";
import { useStorageState } from "@/context/useStorageState"; // Import your useStorageState hook
import { API_URL } from "@/constants/api";
import axios from "axios";
import { useSession } from "@/context/authContext";

// Interfaces
interface StatCard {
  title: string;
  value: number | string;
  change: string;
}

interface ChartDataPoint {
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
  const {session} = useSession();
  const [statCards, setStatCards] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [taskStats, setTaskStats] = useState<TaskStat[]>([]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!session) return; // Wait until userId is available

      try {
      
        const response = await axios.get(`${API_URL}/progress/${session?.userId}`);
        const result = response.data;
        console.log(result);

        if (result.status === "success") {
          const { totalModules, averageGrade, totalCorrect, averageModule } = result.data;

          // Set stats cards with fetched data
          setStatCards([
            { title: "Total Modules", value: totalModules, change: "+10% than last month" },
            { title: "Average Grade", value: averageGrade, change: "+5% than last month" },
            { title: "Total Correct", value: totalCorrect, change: "+15% than last month" },
            { title: "Average Module", value: averageModule, change: "+10% than last month" },
          ]);

          // Set chart data
          setChartData([
            { date: "Jun 12", current: 110, previous: 90 },
            { date: "Jun 13", current: 85, previous: 95 },
            { date: "Jun 14", current: 80, previous: 45 },
            { date: "Jun 15", current: 105, previous: 80 },
          ]);

          // Set task statistics
          setTaskStats([
            { label: "Correct Answer", value: 2, color: "#6C2E75" },
            { label: "Wrong Answer", value: 0, color: "#9B51E0" },
            { label: "Not Answered", value: 0, color: "#D5B7E3" },
          ]);
        } else {
          throw new Error(result.message || "Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching progress");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []); // Trigger when userIdData is updated

  const renderDonutChart = () => {
    return (
      <Svg height="100" width="100" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="40" stroke="#6C5CE7" strokeWidth="10" fill="none" />
        <Path
          d="M50 10 A40 40 0 1 1 90 50"
          fill="none"
          stroke="#A8A5CE"
          strokeWidth="10"
        />
      </Svg>
    );
  };

  if (loading || !session) {
    return (
      <View>
        <ActivityIndicator size="large" color="#6C5CE7" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

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
            labels: chartData.map((data) => data.date),
            datasets: [
              {
                data: chartData.map((data) => data.current),
                color: () => "#6C5CE7",
              },
              {
                data: chartData.map((data) => data.previous),
                color: () => "#A8A5CE",
              },
            ],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
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

      {/* Task and Computational Cards */}
      <View style={styles.bottomCardsContainer}>
        {/* Task Card */}
        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Tasks</Text>
          <View style={styles.taskContent}>
            <View style={styles.donutChart}>{renderDonutChart()}</View>
            <View style={styles.taskStats}>
              {taskStats.map((stat, index) => (
                <View key={index} style={styles.taskStatRow}>
                  <View
                    style={[styles.taskStatDot, { backgroundColor: stat.color }]}
                  />
                  <Text style={styles.taskStatLabel}>{stat.label}</Text>
                  <Text style={styles.taskStatValue}>{stat.value} Questions</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.computationalCard}>
          <Text style={styles.cardTitle}>Computational</Text>
          <View style={styles.moduleInfo}>
            <Text style={styles.moduleTitle}>0 Moduls Left</Text>
            <Text style={styles.moduleSubtitle}>0% from last month</Text>
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

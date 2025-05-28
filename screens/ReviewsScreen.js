"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, useWindowDimensions } from "react-native"
import { WebView } from "react-native-webview"
import NetInfo from "@react-native-community/netinfo"
import { Ionicons } from "@expo/vector-icons"
import reviewsData from "../data/reviews.json"

const ITEMS_PER_PAGE = 6

function getYouTubeEmbedUrl(watchUrl) {
  if (!watchUrl) return null
  try {
    const url = new URL(watchUrl)
    let videoId
    if (url.hostname === "youtu.be") {
      videoId = url.pathname.substring(1)
    } else if (url.hostname.includes("youtube.com") && url.searchParams.has("v")) {
      videoId = url.searchParams.get("v")
    } else {
      const match = watchUrl.match(/[?&]v=([^&]+)/)
      if (match) videoId = match[1]
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  } catch {
    return null
  }
}

export default function ReviewsScreen() {
  const [displayedReviews, setDisplayedReviews] = useState([])
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isOnline, setIsOnline] = useState(true)
  const [loading, setLoading] = useState(true)
  const { width } = useWindowDimensions()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected && state.isInternetReachable)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const reviewsWithEmbed = reviewsData
      .map((review) => ({
        ...review,
        embedUrl: getYouTubeEmbedUrl(review.youtube_url),
      }))
      .filter((r) => r.embedUrl)

    setDisplayedReviews(reviewsWithEmbed.slice(0, ITEMS_PER_PAGE))
    setLoading(false)
  }, [])

  const handleLoadMore = () => {
    const nextCount = visibleCount + ITEMS_PER_PAGE
    const reviewsWithEmbed = reviewsData
      .map((review) => ({
        ...review,
        embedUrl: getYouTubeEmbedUrl(review.youtube_url),
      }))
      .filter((r) => r.embedUrl)
    setDisplayedReviews(reviewsWithEmbed.slice(0, nextCount))
    setVisibleCount(nextCount)
  }

  const handleRetry = async () => {
    const state = await NetInfo.fetch()
    setIsOnline(state.isConnected && state.isInternetReachable)
  }

  const getCardWidth = () => {
    if (width >= 1024) return "32%" // Desktop/tablet landscape
    if (width >= 768) return "48%" // Medium tablets
    return "100%" // Mobile
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Customer Reviews</Text>
          <Text style={styles.description}>
            Hear directly from our satisfied clients about their experiences with PITS Global Data Recovery Services.
          </Text>

          {!isOnline ? (
            <View style={styles.centerContainer}>
              <Ionicons name="wifi-outline" size={64} color="#ef4444" style={styles.icon} />
              <Text style={styles.noInternetTitle}>No Internet Connection</Text>
              <Text style={styles.noInternetText}>
                YouTube videos require an internet connection to load. Please reconnect to view them.
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Ionicons name="refresh" size={20} color="white" style={styles.retryIcon} />
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.reviewsGrid}>
              {displayedReviews.map((review, index) => (
                <View key={index} style={[styles.reviewCard, { width: getCardWidth() }]}>
                  <WebView
                    source={{ uri: review.embedUrl }}
                    style={styles.videoContainer}
                    allowsFullscreenVideo
                    startInLoadingState
                  />
                </View>
              ))}
            </View>
          )}

          {isOnline && displayedReviews.length < reviewsData.length && (
            <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
              <Text style={styles.loadMoreText}>Load More Reviews</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  scrollView: { flex: 1 },
  content: { padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#54595F",
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 400,
  },
  reviewsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
    columnGap: 12,
  },
  reviewCard: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
    marginBottom: 16,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
  },
  centerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  icon: { marginBottom: 12 },
  noInternetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  noInternetText: {
    fontSize: 14,
    color: "#54595F",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 300,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#d93927",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  retryIcon: {
    marginRight: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadMoreButton: {
    backgroundColor: "#d93927",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 32,
  },
  loadMoreText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

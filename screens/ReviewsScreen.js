"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { WebView } from "react-native-webview"
import NetInfo from "@react-native-community/netinfo"
import { Ionicons } from "@expo/vector-icons"

// Import the local JSON file
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
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
  } catch (error) {
    console.error("Error parsing YouTube URL:", error, "URL:", watchUrl)
  }
  return null
}

export default function ReviewsScreen() {
  const [allReviews, setAllReviews] = useState([])
  const [displayedReviews, setDisplayedReviews] = useState([])
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionState, setConnectionState] = useState({
    isConnected: null,
    isInternetReachable: null,
  })
  const [checkingConnection, setCheckingConnection] = useState(false)

  const checkInternetConnection = async () => {
    setCheckingConnection(true)
    try {
      const netInfoState = await NetInfo.fetch()
      setConnectionState({
        isConnected: netInfoState.isConnected,
        isInternetReachable: netInfoState.isInternetReachable,
      })
      return netInfoState.isConnected && netInfoState.isInternetReachable
    } catch (err) {
      console.error("Error checking internet connection:", err)
      setConnectionState({
        isConnected: false,
        isInternetReachable: false,
      })
      return false
    } finally {
      setCheckingConnection(false)
    }
  }

  const loadReviews = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate a small delay to show loading state
      setTimeout(() => {
        const reviewsWithEmbed = reviewsData
          .map((review) => ({
            ...review,
            embedUrl: getYouTubeEmbedUrl(review.youtube_url),
          }))
          .filter((review) => review.embedUrl)

        setAllReviews(reviewsWithEmbed)
        setDisplayedReviews(reviewsWithEmbed.slice(0, ITEMS_PER_PAGE))
        setLoading(false)
      }, 500)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const initializePage = async () => {
    const hasInternet = await checkInternetConnection()
    if (hasInternet) {
      await loadReviews()
    } else {
      setLoading(false)
    }
  }

  const handleRetry = async () => {
    await initializePage()
  }

  useEffect(() => {
    initializePage()

    // Listen for network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
      })
    })

    return () => unsubscribe()
  }, [])

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + ITEMS_PER_PAGE
    setVisibleCount(newVisibleCount)
    setDisplayedReviews(allReviews.slice(0, newVisibleCount))
  }

  const hasInternet = connectionState.isConnected && connectionState.isInternetReachable

  // Show loading state
  if (loading || checkingConnection) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="wifi" size={48} color="#d93927" style={styles.icon} />
          <Text style={styles.loadingText}>
            {checkingConnection ? "Checking internet connection..." : "Loading reviews..."}
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  // Show no internet state
  if (!hasInternet) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="wifi-outline" size={64} color="#ef4444" style={styles.icon} />
          <Text style={styles.noInternetTitle}>No Internet Connection</Text>
          <Text style={styles.noInternetText}>
            Customer reviews require an internet connection to load videos. Please check your connection and try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry} disabled={checkingConnection}>
            <Ionicons name="refresh" size={20} color="white" style={styles.retryIcon} />
            <Text style={styles.retryButtonText}>{checkingConnection ? "Checking..." : "Retry"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle" size={48} color="#ef4444" style={styles.icon} />
          <Text style={styles.errorText}>Error loading reviews: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Ionicons name="refresh" size={20} color="white" style={styles.retryIcon} />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // Show reviews when everything is loaded and internet is available
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Customer Reviews</Text>
          <Text style={styles.description}>
            Hear directly from our satisfied clients about their experiences with PITS Global Data Recovery Services.
          </Text>

          {displayedReviews.length > 0 ? (
            <View style={styles.reviewsContainer}>
              {displayedReviews.map((review, index) => (
                <View key={index} style={styles.reviewCard}>
                  <WebView
                    source={{ uri: review.embedUrl }}
                    style={styles.videoContainer}
                    allowsFullscreenVideo={true}
                    mediaPlaybackRequiresUserAction={false}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                  />
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noReviewsText}>No reviews available at the moment.</Text>
          )}

          {allReviews.length > visibleCount && (
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
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 16,
  },
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
  reviewsContainer: {
    gap: 24,
  },
  reviewCard: {
    backgroundColor: "white",
    borderRadius: 12,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 4,
    overflow: "hidden",
    marginBottom: 16,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
  },
  loadingText: {
    fontSize: 16,
    color: "#54595F",
    textAlign: "center",
  },
  noInternetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  noInternetText: {
    fontSize: 16,
    color: "#54595F",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
    maxWidth: 300,
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  noReviewsText: {
    fontSize: 16,
    color: "#54595F",
    textAlign: "center",
    paddingVertical: 40,
  },
  retryButton: {
    backgroundColor: "#d93927",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
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

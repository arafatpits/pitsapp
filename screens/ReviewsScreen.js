"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { WebView } from "react-native-webview"

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

  useEffect(() => {
    const initializePage = async () => {
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

    initializePage()
  }, [])

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + ITEMS_PER_PAGE
    setVisibleCount(newVisibleCount)
    setDisplayedReviews(allReviews.slice(0, newVisibleCount))
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error loading reviews: {error}</Text>
        </View>
      </SafeAreaView>
    )
  }

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
                  <Text style={styles.reviewTitle}>{review.title}</Text>
                  <View style={styles.videoContainer}>
                    <WebView
                      source={{ uri: review.embedUrl }}
                      style={styles.webView}
                      allowsFullscreenVideo={true}
                      mediaPlaybackRequiresUserAction={false}
                    />
                  </View>
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
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    padding: 16,
    paddingBottom: 12,
  },
  videoContainer: {
    height: 200,
  },
  webView: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: "#54595F",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    textAlign: "center",
    paddingHorizontal: 24,
  },
  noReviewsText: {
    fontSize: 16,
    color: "#54595F",
    textAlign: "center",
    paddingVertical: 40,
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

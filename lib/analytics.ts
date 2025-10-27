import { logEvent } from 'firebase/analytics'
import { analytics } from './firebase'

/**
 * Analytics utility functions for tracking user events
 */

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (analytics && typeof window !== 'undefined') {
    logEvent(analytics, eventName, eventParams)
  }
}

// Custom event helpers for AuraChain

export const trackAuraAwarded = (params: {
  auraType: string
  category: string
  recipientRole: string
}) => {
  trackEvent('aura_awarded', params)
}

export const trackUserSignup = (params: { role: string; method: string }) => {
  trackEvent('user_signup', params)
}

export const trackUserLogin = (params: { role: string; method: string }) => {
  trackEvent('user_login', params)
}

export const trackNFTMinted = (params: {
  auraType: string
  mintAddress?: string
  success: boolean
}) => {
  trackEvent('nft_minted', params)
}

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page_name: pageName })
}

export const trackWalletConnected = (params: { walletType: string }) => {
  trackEvent('wallet_connected', params)
}

export const trackCollectionCreated = (params: {
  collectionAddress?: string
  success: boolean
}) => {
  trackEvent('collection_created', params)
}

import { useEffect } from 'react';

const normalizeUrl = (url?: string) => url?.trim().replace(/\/$/, '') || '';

export const useSpotifyWebhookSubscription = () => {
    const providerUrl = normalizeUrl(import.meta.env.VITE_SPOTIFY_PROVIDER_URL as string | undefined);
    const webhookUrl = ((import.meta.env.VITE_SPOTIFY_PROVIDER_URL as string | undefined)?.trim() || '') + '/spotify';
    const adminToken = (import.meta.env.VITE_SPOTIFY_ADMIN_TOKEN as string | undefined)?.trim() || '';
    const signingSecret = (import.meta.env.VITE_SPOTIFY_SIGNING_SECRET as string | undefined)?.trim();

    useEffect(() => {
        if (!providerUrl || !webhookUrl || !adminToken) {
            console.warn('[spotify-webhook] Missing provider URL, webhook URL, or admin token. Skipping auto-subscription.');
            return;
        }

        const controller = new AbortController();
        let cancelled = false;

        const subscribe = async () => {
            try {
                const response = await fetch(`${providerUrl}/spotify/webhooks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${adminToken}`,
                    },
                    body: JSON.stringify({
                        url: webhookUrl,
                        signingSecretOverride: signingSecret || undefined,
                    }),
                    signal: controller.signal,
                });

                const payload = await response.json().catch(() => null);

                if (cancelled) {
                    return;
                }

                if (!response.ok) {
                    const errorMessage = payload?.error ?? `Unexpected response (${response.status})`;
                    console.error('[spotify-webhook] Subscription failed:', errorMessage);
                    return;
                }

                console.log('[spotify-webhook] Subscription created:', payload);
            } catch (error) {
                if (cancelled || error instanceof DOMException) {
                    return;
                }
                console.error('[spotify-webhook] Subscription error:', error);
            }
        };

        subscribe();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [providerUrl, webhookUrl, adminToken, signingSecret]);
};

export default useSpotifyWebhookSubscription;

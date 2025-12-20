export const storageUtils = {
    // Save with size limit check
    saveWithLimit: (key, data, limit = 50) => {
        try {
            const jsonData = JSON.stringify(data.slice(0, limit));
            // Check size (localStorage typically has 5-10MB limit)
            if (jsonData.length > 4.5 * 1024 * 1024) {
                console.warn('Storage approaching limit, removing oldest items');
                return storageUtils.saveWithLimit(key, data.slice(0, limit / 2), limit / 2);
            }
            localStorage.setItem(key, jsonData);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    // Get parsed data with fallback
    getParsed: (key, fallback = []) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return fallback;
        }
    },

    // Clear old images (older than 30 days)
    clearOldImages: (key, maxAgeDays = 30) => {
        try {
            const images = storageUtils.getParsed(key, []);
            const cutoff = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);

            const filtered = images.filter(img => {
                const imgDate = new Date(img.timestamp || 0).getTime();
                return imgDate > cutoff;
            });

            if (filtered.length < images.length) {
                storageUtils.saveWithLimit(key, filtered);
                console.log(`Cleared ${images.length - filtered.length} old images`);
            }

            return filtered;
        } catch (error) {
            console.error('Error clearing old images:', error);
            return [];
        }
    }
};
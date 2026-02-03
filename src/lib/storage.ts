import { supabaseStorage } from '@/sdk/supabase-storage';

/**
 * Native Supabase Storage SDK
 * 
 * Uploads directly to Supabase Storage (no backend proxy).
 * RLS policies allow public access by default.
 * 
 * Bucket: VITE_STORAGE_BUCKET (fallback: VITE_PROJECT_ID)
 * Connection: Direct to shared Supabase (fast)
 * 
 * Usage:
 * ```ts
 * import { storage } from '@/lib/storage';
 * 
 * // Upload file
 * const { data, error } = await storage.upload('avatars/user-123/photo.jpg', file);
 * 
 * // Get public URL
 * const url = storage.getPublicUrl('avatars/user-123/photo.jpg');
 * ```
 * 
 * Suggested folder structure:
 * - avatars/{userId}/ - User profile pictures
 * - posts/{postId}/ - Post attachments
 * - documents/{docId}/ - PDFs, files
 * - public/ - Shared assets
 */

const BUCKET_NAME = import.meta.env.VITE_STORAGE_BUCKET || import.meta.env.VITE_PROJECT_ID;

if (!BUCKET_NAME) {
  console.warn('[storage] No bucket configured (VITE_STORAGE_BUCKET or VITE_PROJECT_ID missing)');
}

export const storage = {
  /**
   * Upload a file to storage
   */
  async upload(path: string, file: File | Blob, options?: { upsert?: boolean }) {
    if (!BUCKET_NAME) {
      return { data: null, error: { message: 'Storage bucket not configured' } };
    }

    const { data, error } = await supabaseStorage.storage
      .from(BUCKET_NAME)
      .upload(path, file, { upsert: options?.upsert });

    return { data, error };
  },

  /**
   * Get public URL for a file
   */
  getPublicUrl(path: string): string {
    if (!BUCKET_NAME) {
      return '';
    }

    const { data } = supabaseStorage.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return data.publicUrl;
  },

  /**
   * Delete a file
   */
  async remove(paths: string | string[]) {
    if (!BUCKET_NAME) {
      return { data: null, error: { message: 'Storage bucket not configured' } };
    }

    const pathArray = Array.isArray(paths) ? paths : [paths];
    const { data, error } = await supabaseStorage.storage
      .from(BUCKET_NAME)
      .remove(pathArray);

    return { data, error };
  },

  /**
   * List files in a folder
   */
  async list(folder: string = '', options?: { limit?: number; offset?: number }) {
    if (!BUCKET_NAME) {
      return { data: [], error: { message: 'Storage bucket not configured' } };
    }

    const { data, error } = await supabaseStorage.storage
      .from(BUCKET_NAME)
      .list(folder, options);

    return { data: data || [], error };
  },

  /**
   * Upload user avatar (convenience helper)
   */
  async uploadAvatar(file: File, userId: string) {
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}.${ext}`;
    return this.upload(`avatars/${userId}/${filename}`, file, { upsert: true });
  },

  /**
   * Upload post image (convenience helper)
   */
  async uploadPostImage(file: File, postId: string) {
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}.${ext}`;
    return this.upload(`posts/${postId}/${filename}`, file);
  },
};


import { supabase } from '@/lib/supabase';
import { Platform } from 'react-native';

export interface ProcessImageResult {
  success: boolean;
  imageData?: string;
  error?: string;
}

export const processImage = async (imageUri: string): Promise<ProcessImageResult> => {
  try {
    if (!imageUri) {
      return {
        success: false,
        error: 'No image provided',
      };
    }
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return {
        success: false,
        error: 'Please sign in to process images',
      };
    }

    console.log('Processing image for user:', user.id);

    // Use mock function
    const { data, error } = await supabase.functions.invoke('remove-background', {
      body: {
        image_uri: imageUri
      }
    });

    if (error) {
      console.error('Processing failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to process image'
      };
    }

    return {
      success: true,
      imageData: data.image,
    };
  } catch (error) {
    console.error('Image processing error:', error);
    
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
};

export const getGeneratedImages = async (userId?: string, limit = 20, offset = 0) => {
  try {
    // Get user ID if not provided
    let targetUserId = userId;
    if (!targetUserId) {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('User not authenticated');
      }
      targetUserId = user.id;
    }

    // Add logging to see what's being returned
    console.log('Fetching images for user:', targetUserId);
    
    // Use the mock database method
    const { data, error } = await supabase
      .from('generated_images')
      .select('id, processed_image_url, processed_image_data_url, created_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Log the returned data
    console.log('Fetched images:', data);

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching generated images:', error);
    return { data: null, error };
  }
};

export const deleteGeneratedImage = async (imageId: string) => {
  try {
    console.log('Starting deleteGeneratedImage for ID:', imageId);
    
    // 1. Get user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Authentication error:', userError);
      return { error: 'Authentication failed' };
    }
    console.log('Authenticated as user:', user.id);

    // 2. Get image details
    const { data: image, error: fetchError } = await supabase
      .from('generated_images')
      .select('*')
      .eq('id', imageId)
      .single();

    if (fetchError) {
      console.error('Error fetching image:', fetchError);
      return { error: 'Failed to fetch image details' };
    }

    if (!image) {
      console.error('Image not found');
      return { error: 'Image not found' };
    }

    console.log('Found image:', image);

    // 3. Delete from storage if URL exists
    if (image.processed_image_url) {
      console.log('Attempting to delete from storage:', image.processed_image_url);
      try {
        const { error: storageError } = await supabase.storage
          .from('processed-images')
          .remove([image.processed_image_url]);

        if (storageError) {
          console.error('Storage deletion error:', storageError);
          // Continue with DB deletion even if storage deletion fails
        } else {
          console.log('Successfully deleted from storage');
        }
      } catch (storageError) {
        console.error('Storage deletion threw error:', storageError);
        // Continue with DB deletion even if storage deletion fails
      }
    }

    // 4. Delete from database
    console.log('Attempting to delete from database');
    const { error: deleteError } = await supabase
      .from('generated_images')
      .delete()
      .match({ id: imageId, user_id: user.id });

    if (deleteError) {
      console.error('Database deletion error:', deleteError);
      return { error: 'Failed to delete from database' };
    }

    console.log('Successfully deleted from database');
    return { error: null };

  } catch (error) {
    console.error('Unexpected error in deleteGeneratedImage:', error);
    return { error: 'Unexpected error occurred' };
  }
}; 
import { supabase } from '@/lib/supabase';

export async function getGeneratedImages(userId: string) {
  console.log('Getting generated images for user:', userId);
  
  // Return mock gallery images for demo
  const mockImages = [
    {
      id: '1',
      processed_image_url: 'demo-image-1.jpg',
      processed_image_data_url: null,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: '2',
      processed_image_url: 'demo-image-2.jpg', 
      processed_image_data_url: null,
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
    {
      id: '3',
      processed_image_url: 'demo-image-3.jpg',
      processed_image_data_url: null,
      created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    }
  ];
  
  return {
    data: mockImages,
    error: null
  };
}

export async function deleteGeneratedImage(imageId: string) {
  console.log('Deleting image:', imageId);
  // Mock successful deletion
  return { error: null };
} 
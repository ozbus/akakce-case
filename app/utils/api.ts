// Gerekli model türlerinin import edilmesi
import { ProductListResponse, ProductDetails } from "~/models/product";

/**
 * API'den veri çeken genel fonksiyon
 * @param {string} url - Veri çekilecek API URL'si
 * @returns {Promise<T>} - JSON formatında çözülmüş veri
 */
async function fetchData<T>(url: string): Promise<T> {
  try {
    // URL'ye HTTP GET isteği gönder
    const response = await fetch(url);

    // Eğer yanıt başarısızsa, hata metnini al ve özel bir hata fırlat
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata ${response.status}: ${errorText}`);
    }

    // Yanıttaki JSON verisini çöz ve döndür
    return await response.json();
  } catch (error) {
    // Hata durumunda konsola hata mesajını yaz
    console.error("Veri çekme hatası:", error);

    // Kullanıcıya daha anlaşılır bir hata mesajı sun
    throw new Error("Veri alınamadı. Lütfen daha sonra tekrar deneyiniz.");
  }
}

/**
 * Ürün listesini çeken fonksiyon
 * @param {string} url - Ürün listesi çekilecek API URL'si
 * @returns {Promise<ProductListResponse>} - Ürün listesi verisi
 */
export async function fetchProducts(url: string): Promise<ProductListResponse> {
  // Genel fetchData fonksiyonunu kullanarak ürün listesini çek
  return await fetchData<ProductListResponse>(url);
}

/**
 * Tek bir ürünün detaylarını çeken fonksiyon
 * @param {string} url - Ürün detayları çekilecek API URL'si
 * @returns {Promise<ProductDetails>} - Ürün detay bilgileri
 */
export async function fetchProductDetails(url: string): Promise<ProductDetails> {
  // Genel fetchData fonksiyonunu kullanarak ürün detaylarını çek
  return await fetchData<ProductDetails>(url);
}

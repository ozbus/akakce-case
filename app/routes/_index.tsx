// Gerekli kütüphanelerin ve bileşenlerin import edilmesi
import { useLoaderData } from "@remix-run/react"; // Remix'in useLoaderData hook'u
import { fetchProducts } from "~/utils/api"; // Ürünleri getiren API fonksiyonu
import HorizontalScroller from "~/components/HorizontalScroller"; // Yatay kaydırmalı ürün listeleme bileşeni
import ProductList from "~/components/ProductList"; // Ürün listesi bileşeni

// Loader fonksiyonu: Sayfa yüklendiğinde çalışır ve gerekli verileri çeker
export async function loader() {
    // API'den verileri çekiyoruz
    return await fetchProducts("https://mock.akakce.dev/page.json");
}

// Ana bileşen (Index sayfası)
export default function Index() {
    // Loader'dan gelen veriler parçalanır (yatay ürün listesi, ürün listesi ve sonraki sayfa URL'si)
    const { horizontalProductList, productList, nextUrl } = useLoaderData();

    return (
        <div>
            {/* Yatay kaydırmalı ürün listesi */}
            <HorizontalScroller products={horizontalProductList} />

            {/* Dikey ürün listesi */}
            <ProductList initialProducts={productList} nextUrl={nextUrl} />
        </div>
    );
}

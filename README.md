# ConsolePopup.js

![Versiyon](https://img.shields.io/badge/version-1.0-blue.svg)
![Lisans](https://img.shields.io/badge/license-MIT-green.svg)

Herhangi bir web sitesinin tarayıcı konsoluna yapıştırdığınızda güzel, özelleştirilebilir pop-up mesajlar görüntüleyen hafif bir JavaScript kütüphanesi.

## 🌟 Özellikler

- **Kolay Kullanım**: Kodu kopyalayıp yapıştırmanız yeterli
- **Tam Özelleştirilebilir**: Renkler, temalar, animasyonlar, boyutlar
- **Zengin Temalar**: Gradient, karanlık, aydınlık ve özel temalar
- **Animasyonlar**: Kayma, solma, zıplama animasyonları
- **Sürükle & Bırak**: Popup'ı ekranda istediğiniz yere taşıyabilme
- **Otomatik Kapanma**: İsteğe bağlı otomatik kapanma özelliği
- **Duyarlı Tasarım**: Tüm ekran boyutlarıyla uyumlu
- **Tarayıcı Uyumluluğu**: Modern tarayıcıların tümünde çalışır
- **Hiçbir Bağımlılık Yok**: Saf JavaScript ile yazılmıştır
- **Güvenlik Odaklı**: XSS saldırılarına karşı korumalı

## 📋 Nasıl Kullanılır

### Temel Kullanım

1. `popup.js` dosyasındaki kodu kopyalayın
2. Herhangi bir web sitesinde tarayıcınızın geliştirici araçlarını açın (F12 veya sağ tıklayıp "İncele")
3. Konsol sekmesine gidin
4. Kopyaladığınız kodu yapıştırın ve Enter tuşuna basın
5. Pop-up ekranda görünecektir

### Özelleştirme

`popup.js` dosyası içindeki `config` nesnesini değiştirerek pop-up'ın görünümünü ve davranışını özelleştirebilirsiniz:

```javascript
const config = {
  // Temel ayarlar
  title: '✨ Konsol Pop-up',  // Başlık
  width: '350px',            // Genişlik
  position: 'right',         // Konum ('right' veya 'left')
  
  // Tema ayarları
  theme: 'gradient',         // 'gradient', 'dark', 'light', 'custom'
  headerGradient: '135deg, #6e8efb, #a777e3',
  
  // İçerik
  content: [
    'Merhaba! Bu bir konsol pop-up örneğidir.',
    'İstediğiniz gibi özelleştirebilirsiniz.'
  ],
  
  // Animasyon ayarları
  animation: 'slide',        // 'slide', 'fade', 'bounce', 'none'
  
  // Özellikler
  draggable: true,           // Sürükle-bırak özelliği
  closable: true,            // Kapatma düğmesi
  autoClose: false,          // Otomatik kapanma
  autoCloseDelay: 5000,      // ms cinsinden otomatik kapanma süresi
  
  // ...diğer ayarlar
};
```

## 🎨 Tema Örnekleri

ConsolePopup.js ile farklı temalar kullanabilirsiniz:

- **Gradient (Varsayılan)**: Şık bir gradyan tema
- **Dark**: Koyu renkli, modern görünüm
- **Light**: Aydınlık, minimal görünüm
- **Custom**: Tamamen özelleştirilebilir renkler

## 💻 Demo

Canlı demo için: [tahamehel.tr/console-popup](https://tahamehel.tr/console-popup)

Demo görmek için:

1. Bu repo'yu klonlayın: `git clone https://github.com/tahamhl/console-popup.git`
2. `index.html` dosyasını tarayıcınızda açın
3. "Pop-up'ı Göster" düğmesine tıklayın veya konsola kodu yapıştırın

## 🔧 Gelişmiş Kullanım

### Programatik Kontrol

Kodu kendi JavaScript projenize entegre ederek daha gelişmiş kullanım senaryoları oluşturabilirsiniz.

### Olay Dinleyicileri

Pop-up kapanırken, açılırken veya etkileşime girildiğinde tetiklenen olayları dinleyebilirsiniz.

## 🛠 Geliştirme

1. Repo'yu klonlayın: `git clone https://github.com/tahamhl/console-popup.git`
2. İndeks dosyasını açın: `index.html`
3. Değişiklikleri yapın ve test edin

## 📜 Lisans

MIT Lisansı altında dağıtılmaktadır. Detaylar için `LICENSE` dosyasına bakın.



## 📝 Not

Bu kütüphane eğitim amaçlıdır ve dikkatli kullanılmalıdır. Üretim ortamlarında kullanmadan önce güvenlik durumunu değerlendirin.

---

[tahamehel.tr](https://tahamehel.tr) 
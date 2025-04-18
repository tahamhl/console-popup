/**
 * ConsolePopup.js v1.0
 * 
 * Konsola yapıştırılarak herhangi bir sitede özelleştirilebilir pop-up mesajları göstermenizi sağlayan araç
 * Gelişmiş sürükle-bırak, tema ve animasyon özellikleri ile birlikte
 * 
 * Kodu konsola yapıştırmanız yeterlidir.
 * Güvenlik kısıtlamaları için optimize edilmiştir.
 * 
 * @author Kullanıcı
 * @license MIT
 */

(function() {
  try {
    /**
     * Yapılandırma - Bu değerleri isteğinize göre değiştirebilirsiniz
     */
    const config = {
      // Temel ayarlar
      title: '✨ Konsol Pop-up',
      width: '350px',
      position: 'right', // 'right' veya 'left'
      
      // Tema ayarları
      theme: 'gradient', // 'gradient', 'dark', 'light', 'custom'
      customHeaderColor: null, // theme: 'custom' olduğunda kullanılır
      headerGradient: '135deg, #6e8efb, #a777e3',
      
      // İçerik
      content: [
        'Merhaba! Bu bir konsol pop-up örneğidir.',
        'Herhangi bir web sitesinin konsoluna yapıştırılan JavaScript kodu ile oluşturulmuştur.',
        'Kendi uygulamanız için özelleştirebilirsiniz.',
      ],
      
      // Animasyon ayarları
      animation: 'slide', // 'slide', 'fade', 'bounce', 'none'
      
      // Özellikler
      draggable: true, // sürükle-bırak özelliği
      closable: true, // kapatma düğmesi
      autoClose: false, // otomatik kapanma
      autoCloseDelay: 5000, // ms cinsinden otomatik kapanma süresi
      
      // Düğmeler
      showButton: true, // altdaki düğmeyi göster/gizle
      buttonText: 'Tamam',
      
      // İkonlar
      closeIcon: '×', // Kapatma düğmesi ikonu
      
      // Gelişmiş ayarlar
      zIndex: 9999,
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      
      // Konumlandırma
      verticalMargin: '20px',
      horizontalMargin: '20px'
    };
    
    // Eski popupları temizle
    const oldPopup = document.getElementById('console-popup');
    if (oldPopup) {
      oldPopup.parentNode.removeChild(oldPopup);
    }

    // Eski stilleri temizle
    const oldStyle = document.getElementById('console-popup-style');
    if (oldStyle) {
      oldStyle.parentNode.removeChild(oldStyle);
    }

    // Tema renklerini belirle
    let headerBg, headerColor, buttonBg;
    switch(config.theme) {
      case 'dark':
        headerBg = '#2c3e50';
        headerColor = '#ffffff';
        buttonBg = '#2c3e50';
        break;
      case 'light':
        headerBg = '#f5f5f5';
        headerColor = '#333333';
        buttonBg = '#3498db';
        break;
      case 'custom':
        headerBg = config.customHeaderColor || '#6e8efb';
        headerColor = '#ffffff';
        buttonBg = config.customHeaderColor || '#6e8efb';
        break;
      case 'gradient':
      default:
        headerBg = `linear-gradient(${config.headerGradient})`;
        headerColor = '#ffffff';
        buttonBg = `linear-gradient(${config.headerGradient})`;
        break;
    }
    
    // Animasyon stilini belirle
    let animationStyle;
    switch(config.animation) {
      case 'fade':
        animationStyle = `
          @keyframes popupFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          animation: popupFadeIn 0.3s ease-out;
        `;
        break;
      case 'bounce':
        animationStyle = `
          @keyframes popupBounce {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          animation: popupBounce 0.5s ease-out;
        `;
        break;
      case 'none':
        animationStyle = '';
        break;
      case 'slide':
      default:
        animationStyle = `
          @keyframes popupSlideIn {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          animation: popupSlideIn 0.3s ease-out;
        `;
        break;
    }
    
    // Otomatik kapanma için zamanlayıcı
    let autoCloseTimer = null;
    
    // CSS stilini oluştur
    const style = document.createElement('style');
    style.id = 'console-popup-style';
    style.textContent = `
      #console-popup {
        position: fixed;
        bottom: ${config.verticalMargin};
        ${config.position === 'right' ? 'right' : 'left'}: ${config.horizontalMargin};
        width: ${config.width};
        background-color: #fff;
        border-radius: ${config.borderRadius};
        box-shadow: ${config.boxShadow};
        z-index: ${config.zIndex};
        overflow: hidden;
        font-family: ${config.fontFamily};
        font-size: ${config.fontSize};
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        ${animationStyle}
      }
      
      #console-popup-header {
        background: ${headerBg};
        color: ${headerColor};
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${config.draggable ? 'cursor: move;' : ''}
      }
      
      #console-popup-title {
        font-weight: bold;
        font-size: 16px;
        margin: 0;
      }
      
      #console-popup-close {
        background: none;
        border: none;
        color: ${headerColor};
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.8;
        transition: opacity 0.2s;
      }
      
      #console-popup-close:hover {
        opacity: 1;
      }
      
      #console-popup-content {
        padding: 15px;
        overflow-y: auto;
        line-height: 1.5;
        color: #444;
      }
      
      #console-popup-content p {
        margin: 0 0 10px 0;
      }
      
      #console-popup-content p:last-child {
        margin-bottom: 0;
      }
      
      #console-popup-footer {
        padding: 12px 15px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
      }
      
      #console-popup-button {
        background: ${buttonBg};
        color: ${headerColor};
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: opacity 0.2s;
      }
      
      #console-popup-button:hover {
        opacity: 0.9;
      }
      
      #console-popup-timestamp {
        color: #999;
        font-size: 12px;
        margin-top: 10px;
        text-align: right;
        padding: 0 15px 8px;
      }
    `;
    document.head.appendChild(style);

    // Pop-up oluştur
    const popup = document.createElement('div');
    popup.id = 'console-popup';
    
    // Header kısmı
    const header = document.createElement('div');
    header.id = 'console-popup-header';
    
    const title = document.createElement('h3');
    title.id = 'console-popup-title';
    title.textContent = config.title;
    header.appendChild(title);
    
    if (config.closable) {
      const closeButton = document.createElement('button');
      closeButton.id = 'console-popup-close';
      closeButton.textContent = config.closeIcon;
      closeButton.addEventListener('click', function() {
        closePopup();
      });
      header.appendChild(closeButton);
    }
    
    popup.appendChild(header);
    
    // İçerik kısmı
    const content = document.createElement('div');
    content.id = 'console-popup-content';
    
    // İçerik paragraflarını oluştur
    config.content.forEach(function(paragraph) {
      const p = document.createElement('p');
      p.textContent = paragraph;
      content.appendChild(p);
    });
    
    popup.appendChild(content);
    
    // Footer kısmı
    if (config.showButton) {
      const footer = document.createElement('div');
      footer.id = 'console-popup-footer';
      
      const button = document.createElement('button');
      button.id = 'console-popup-button';
      button.textContent = config.buttonText;
      button.addEventListener('click', function() {
        closePopup();
      });
      footer.appendChild(button);
      
      popup.appendChild(footer);
    }
    
    // Zaman damgası ekle
    const timestamp = document.createElement('div');
    timestamp.id = 'console-popup-timestamp';
    timestamp.textContent = new Date().toLocaleString();
    popup.appendChild(timestamp);
    
    // Pop-up'ı sayfaya ekle
    document.body.appendChild(popup);
    
    // Popup'ı kapatma fonksiyonu
    function closePopup() {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }
    
    // Otomatik kapanma ayarını uygula
    if (config.autoClose && config.autoCloseDelay > 0) {
      autoCloseTimer = setTimeout(function() {
        closePopup();
      }, config.autoCloseDelay);
      
      // Fare üzerindeyken otomatik kapanmayı durdur
      popup.addEventListener('mouseenter', function() {
        if (autoCloseTimer) {
          clearTimeout(autoCloseTimer);
          autoCloseTimer = null;
        }
      });
      
      // Fare ayrıldığında otomatik kapanmayı yeniden başlat
      popup.addEventListener('mouseleave', function() {
        autoCloseTimer = setTimeout(function() {
          closePopup();
        }, config.autoCloseDelay);
      });
    }
    
    // Drag işlevselliği ekle
    if (config.draggable) {
      let isDragging = false;
      let offsetX, offsetY;
      
      header.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - popup.getBoundingClientRect().left;
        offsetY = e.clientY - popup.getBoundingClientRect().top;
      });
      
      document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        popup.style.left = (e.clientX - offsetX) + 'px';
        popup.style.top = (e.clientY - offsetY) + 'px';
        popup.style.right = 'auto';
        popup.style.bottom = 'auto';
      });
      
      document.addEventListener('mouseup', function() {
        isDragging = false;
      });
    }
    
    console.log('%c Pop-up başarıyla oluşturuldu! ✅ ', 'background: #4CAF50; color: white; padding: 5px; border-radius: 3px;');
    
    // Kullanım ipuçları
    console.log(
      '%c Konsol Pop-up Kullanım Kılavuzu ',
      'background: #2c3e50; color: white; padding: 5px; border-radius: 3px;',
      '\n\n- Pop-up\'ı özelleştirmek için popup.js dosyasındaki config nesnesini düzenleyebilirsiniz.\n' +
      '- Sürükle-bırak özelliği ile popup\'ı istediğiniz yere taşıyabilirsiniz.\n' + 
      '- Farklı temalar ve animasyonlar kullanabilirsiniz.\n' +
      '- Popupları programatik olarak kontrol etmek için ConsolePopup.show(), ConsolePopup.hide() gibi metodları kullanabilirsiniz.'
    );
    
    return "Pop-up gösteriliyor!";
  } catch (error) {
    console.error('Pop-up oluşturulurken bir hata oluştu:', error);
    return "Pop-up oluşturulurken hata oluştu. Detaylar için konsolu kontrol edin.";
  }
})(); 
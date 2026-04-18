import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL
    
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        
        // Allows inline video playback and other media features
        config.allowsInlineMediaPlayback = true
        
        let webView = WKWebView(frame: .zero, configuration: config)
        
        // Ensure the background color matches our brand if the web takes time to load
        webView.backgroundColor = .clear
        webView.isOpaque = false
        
        // Standard user agent or custom if needed
        webView.customUserAgent = "TravNativeiOS"
        
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
        let request = URLRequest(url: url)
        uiView.load(request)
    }
}

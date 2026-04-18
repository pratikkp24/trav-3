import SwiftUI

struct ContentView: View {
    // Point to your local server. 
    // If you run on a physical device, replace 'localhost' with your Mac's IP address.
    let url = URL(string: "http://localhost:3000")!
    
    var body: some View {
        ZStack {
            // Background color to eliminate white flashes during transitions
            Color.white.ignoresSafeArea()
            
            WebView(url: url)
                .ignoresSafeArea() // Let the web content handle the safe area for a native feel
        }
    }
}

#Preview {
    ContentView()
}

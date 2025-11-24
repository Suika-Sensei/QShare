package Suika_Sensei.qshare

import android.os.Bundle
import android.view.KeyEvent
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebView
import androidx.activity.enableEdgeToEdge

class MainActivity : TauriActivity() {
  private lateinit var wv: WebView

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
  }

  override fun onWebViewCreate(webView: WebView) {
    wv = webView
    webView.webChromeClient = object : WebChromeClient() {
      override fun onPermissionRequest(request: PermissionRequest) {
        // Автоматически предоставляем разрешения для камеры
        runOnUiThread {
          request.grant(request.resources)
        }
      }
    }
  }

  private val keyEventMap = mapOf(
    KeyEvent.KEYCODE_BACK to "back",
    KeyEvent.KEYCODE_MENU to "menu",
    KeyEvent.KEYCODE_SEARCH to "search",
    KeyEvent.KEYCODE_VOLUME_DOWN to "volume_down",
    KeyEvent.KEYCODE_VOLUME_UP to "volume_up"
  )

  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    val jsCallbackName = keyEventMap[keyCode]
    wv.evaluateJavascript(
      """
      try {
        window.__tauri_android_on_${if (jsCallbackName != null) "${jsCallbackName}_" else ""}key_down__(${if (jsCallbackName != null) "" else keyCode})
      } catch (_) {
        true
      }
      """.trimIndent()
    ) { result ->
      run {
        if (result != "false") {
          super.onKeyDown(keyCode, event)
        }
      }
    }
    return true
  }
}

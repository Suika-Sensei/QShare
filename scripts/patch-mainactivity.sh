#!/bin/bash

# Script to patch MainActivity.kt with Android back button support
# This is needed because gen/ directory is auto-generated and changes are lost

MAIN_ACTIVITY_PATH="src-tauri/gen/android/app/src/main/java/Suika_Sensei/qshare/MainActivity.kt"

if [ ! -f "$MAIN_ACTIVITY_PATH" ]; then
  echo "❌ MainActivity.kt not found at $MAIN_ACTIVITY_PATH"
  echo "Run 'npm run tauri android init' or 'npm run tauri android build' first"
  exit 1
fi

echo "🔧 Patching MainActivity.kt for Android back button support..."

# Check if already patched
if grep -q "onKeyDown" "$MAIN_ACTIVITY_PATH"; then
  echo "✅ MainActivity.kt is already patched"
  exit 0
fi

# Create backup
cp "$MAIN_ACTIVITY_PATH" "$MAIN_ACTIVITY_PATH.backup"

# Read the current content
CURRENT_CONTENT=$(cat "$MAIN_ACTIVITY_PATH")

# Check if we need to add WebView property
if ! echo "$CURRENT_CONTENT" | grep -q "private lateinit var wv: WebView"; then
  # Add WebView import if not present
  if ! echo "$CURRENT_CONTENT" | grep -q "import android.webkit.WebView"; then
    sed -i 's/import android.os.Bundle/import android.os.Bundle\nimport android.view.KeyEvent\nimport android.webkit.WebView/' "$MAIN_ACTIVITY_PATH"
  else
    sed -i 's/import android.os.Bundle/import android.os.Bundle\nimport android.view.KeyEvent/' "$MAIN_ACTIVITY_PATH"
  fi

  # Add WebView property after class declaration
  sed -i '/class MainActivity : TauriActivity() {/a\  private lateinit var wv: WebView\n' "$MAIN_ACTIVITY_PATH"

  # Update onWebViewCreate to store WebView reference
  sed -i 's/override fun onWebViewCreate(webView: android.webkit.WebView) {/override fun onWebViewCreate(webView: WebView) {\n    wv = webView/' "$MAIN_ACTIVITY_PATH"
fi

# Add the onKeyDown implementation before the closing brace
cat >> "$MAIN_ACTIVITY_PATH" << 'EOF'

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
EOF

# Remove the last closing brace and add it back
sed -i '$ d' "$MAIN_ACTIVITY_PATH"
echo "}" >> "$MAIN_ACTIVITY_PATH"

echo "✅ MainActivity.kt patched successfully!"
echo "📁 Backup saved to $MAIN_ACTIVITY_PATH.backup"

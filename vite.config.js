import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/primus-pipeline/',
})
```

**Open package.json in Notepad:**
```
notepad package.json
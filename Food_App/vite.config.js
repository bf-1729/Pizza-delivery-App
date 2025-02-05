import { defineConfig } from 'vite'; // ✅ ES Modules (Recommended)
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

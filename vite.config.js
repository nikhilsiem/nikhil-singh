import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nikhil-portfolio/', // change this to your GitHub repo name
})

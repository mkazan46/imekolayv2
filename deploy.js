#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 İMEKOLAY Otomatik Deployment Başlatılıyor...');

try {
  // Git durumunu kontrol et
  console.log('📋 Git durumu kontrol ediliyor...');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (gitStatus.trim()) {
    console.log('📝 Değişiklikler tespit edildi, commit yapılıyor...');
    
    // Tüm değişiklikleri ekle
    execSync('git add .', { stdio: 'inherit' });
    
    // Commit mesajı oluştur
    const timestamp = new Date().toLocaleString('tr-TR');
    const commitMessage = `Auto-deploy: ${timestamp}`;
    
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    console.log('✅ Commit tamamlandı!');
  } else {
    console.log('ℹ️  Commit edilecek değişiklik bulunamadı.');
  }
  
  // GitHub'a push et
  console.log('📤 GitHub\'a push ediliyor...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('✅ GitHub push tamamlandı!');
  
  // Vercel'e deploy et
  console.log('🌐 Vercel\'e deploy ediliyor...');
  execSync('npx vercel --prod --yes', { stdio: 'inherit' });
  console.log('✅ Vercel deployment tamamlandı!');
  
  console.log('🎉 Deployment başarıyla tamamlandı!');
  console.log('🔗 Projeniz birkaç dakika içinde canlıya alınacak.');
  
} catch (error) {
  console.error('❌ Deployment sırasında hata oluştu:', error.message);
  process.exit(1);
}